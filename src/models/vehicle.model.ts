import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field } from '@nestjs/graphql';

export type MakeDocument = Make & Document;

@ObjectType()
@Schema()
export class VehicleType {
  @Field()
  @Prop()
  typeId!: string;

  @Field()
  @Prop()
  typeName!: string;
}

@ObjectType()
@Schema()
export class Make {
  @Field()
  @Prop()
  makeId!: string;

  @Field()
  @Prop()
  makeName!: string;

  @Field(() => [VehicleType])
  @Prop({ type: [VehicleType] })
  vehicleTypes!: VehicleType[];
}

export const MakeSchema = SchemaFactory.createForClass(Make);
