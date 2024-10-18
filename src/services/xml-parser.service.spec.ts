import { Test, TestingModule } from '@nestjs/testing';
import { XmlParserService } from './xml-parser.service';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';

jest.mock('axios');
jest.mock('xml2js');

describe('XmlParserService', () => {
  let service: XmlParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XmlParserService],
    }).compile();

    service = module.get<XmlParserService>(XmlParserService);
  });

  describe('fetchMakes', () => {
    it('should return parsed makes data', async () => {
      const mockResponse = {
        Response: {
          Results: [
            {
              AllVehicleMakes: [
                { Make_ID: '1', Make_Name: 'Make1' },
                { Make_ID: '2', Make_Name: 'Make2' },
              ],
            },
          ],
        },
      };

      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: '<Response><Results><AllVehicleMakes><Make_ID>1</Make_ID><Make_Name>Make1</Make_Name></AllVehicleMakes></Results></Response>',
      });
      (parseStringPromise as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await service.fetchMakes();
      expect(result).toEqual(mockResponse.Response.Results[0]);
      expect(axios.get).toHaveBeenCalledWith('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML');
    });
  });

  describe('fetchVehicleTypes', () => {
    it('should return parsed vehicle types data for a given makeId', async () => {
      const makeId = '1';
      const mockResponse = {
        Response: {
          Results: [
            {
              VehicleTypesForMakeIds: [
                { VehicleTypeId: '1', VehicleTypeName: 'Car' },
                { VehicleTypeId: '2', VehicleTypeName: 'Truck' },
              ],
            },
          ],
        },
      };

      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: '<Response><Results><VehicleTypesForMakeIds><VehicleTypeId>1</VehicleTypeId><VehicleTypeName>Car</VehicleTypeName></VehicleTypesForMakeIds></Results></Response>',
      });
      (parseStringPromise as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await service.fetchVehicleTypes(makeId);
      expect(result).toEqual(mockResponse.Response.Results[0]);
      expect(axios.get).toHaveBeenCalledWith(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}?format=XML`,
      );
    });
  });
});
