import { Resolver, Query, Args } from '@nestjs/graphql';
import { MakesService } from '../../services/makes.service';
import { Make } from '../../models/vehicle.model';
import { PaginatedMakes } from '../schemas/paginatedMakes.schema';

@Resolver(() => Make)
export class VehicleResolver {
  constructor(private readonly makesService: MakesService) {}

  @Query(() => PaginatedMakes)
  async makes(
    @Args('page', { nullable: true, defaultValue: 1 }) page: number,
    @Args('limit', { nullable: true, defaultValue: 10 }) limit: number,
  ) {
    const { items, totalCount } = await this.makesService.getAllMakes(page, limit);
    const totalPages = Math.ceil(totalCount / limit);

    return {
      items,
      totalCount,
      totalPages,
      currentPage: page,
    };
  }

  @Query(() => Make, { nullable: true })
  async make(@Args('id') id: string) {
    return this.makesService.getMakeById(id);
  }
}
