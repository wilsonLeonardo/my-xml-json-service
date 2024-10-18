import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MakesService } from './services/makes.service';
import { XmlParserService } from './services/xml-parser.service';
import { VehicleResolver } from './graphql/resolvers/vehicle.resolver';
import { DatabaseModule } from './database/database.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ScheduleModule.forRoot(),
  ],
  providers: [XmlParserService, MakesService, VehicleResolver],
})
export class AppModule {}
