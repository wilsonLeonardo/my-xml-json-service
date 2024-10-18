import { Module } from '@nestjs/common';
import { VehicleResolver } from './resolvers/vehicle.resolver';

@Module({
  providers: [VehicleResolver],
})
export class GraphQLModule {}
