import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';

export interface VehicleDetails {
  VehicleTypeId: string;
  VehicleTypeName: string;
}

export interface VehicleTypesForMakeIds {
  VehicleTypesForMakeIds: Array<VehicleDetails>;
}

export interface MakeXML {
  AllVehicleMakes: Array<{ Make_ID: string; Make_Name: string }>;
}

@Injectable()
export class XmlParserService {
  async fetchMakes(): Promise<MakeXML> {
    const response = await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML');
    const responseParsed = await parseStringPromise(response.data);

    return responseParsed.Response.Results[0];
  }

  async fetchVehicleTypes(makeId: string): Promise<VehicleTypesForMakeIds> {
    const response = await axios.get(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}?format=XML`,
    );
    const responseParsed = await parseStringPromise(response.data);

    return responseParsed.Response.Results[0];
  }
}
