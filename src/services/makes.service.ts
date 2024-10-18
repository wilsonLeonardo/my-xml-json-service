import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { XmlParserService } from './xml-parser.service';
import { Make, MakeDocument } from '../models/vehicle.model';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class MakesService {
  private readonly logger = new Logger(MakesService.name);

  constructor(
    private readonly xmlParser: XmlParserService,
    @InjectModel(Make.name) private makeModel: Model<MakeDocument>,
  ) {
    this.init();
  }

  private async init() {
    await this.makeModel.deleteMany({});

    const makesData = await this.xmlParser.fetchMakes();
    const allMakes = makesData.AllVehicleMakes.slice(0, 20);

    this.logger.log('Start converting makes from XML to JSON');

    const makes = await Promise.all(allMakes.map((make) => this.processMake(make)));

    const filteredMakes = makes.filter((make) => make !== undefined);

    await this.makeModel.insertMany(filteredMakes);
    this.logger.log('Converted successfully');
  }

  @Cron('0 0 * * *')
  async handleCron() {
    this.logger.log('Executing init method from cron job');
    await this.init();
  }

  private async processMake(make: {
    Make_ID: string;
    Make_Name: string;
  }): Promise<
    { makeId: string; makeName: string; vehicleTypes: Array<{ typeId: string; typeName: string }> } | undefined
  > {
    try {
      const vehicleTypesData = await this.xmlParser.fetchVehicleTypes(make.Make_ID);
      const vehicleTypes = vehicleTypesData.VehicleTypesForMakeIds;

      return {
        makeId: make.Make_ID[0],
        makeName: make.Make_Name[0],
        vehicleTypes: vehicleTypes.map((type) => ({
          typeId: type.VehicleTypeId[0],
          typeName: type.VehicleTypeName[0],
        })),
      };
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } catch (error: any) {
      this.logger.error(`Error processing make ${make.Make_Name}: ${error.message}`);
      return undefined;
    }
  }

  async getAllMakes(page: number = 1, limit: number = 10): Promise<{ items: Make[]; totalCount: number }> {
    const totalCount = await this.makeModel.countDocuments().exec();
    const items = await this.makeModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return { items, totalCount };
  }

  async getMakeById(makeId: string): Promise<Make | null> {
    return this.makeModel.findOne({ makeId }).exec();
  }
}
