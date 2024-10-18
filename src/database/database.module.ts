import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Make, MakeSchema } from '../models/vehicle.model';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    MongooseModule.forFeature([{ name: Make.name, schema: MakeSchema }]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
