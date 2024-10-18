import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Make } from '../../models/vehicle.model';

@ObjectType()
export class PaginatedMakes {
  @Field(() => [Make])
  items!: Make[];

  @Field(() => Int)
  totalCount!: number;

  @Field(() => Int)
  totalPages!: number;

  @Field(() => Int)
  currentPage!: number;
}
