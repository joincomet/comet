import { ArgsType, Field } from 'type-graphql'
import { PaginationArgs } from '@/args/PaginationArgs'
import { PlanetSort } from '@/types/planet/PlanetSort'

@ArgsType()
export class PlanetsArgs extends PaginationArgs {
  @Field(() => PlanetSort, { defaultValue: PlanetSort.AZ })
  sort: PlanetSort = PlanetSort.AZ

  @Field({ defaultValue: false })
  joined: boolean

  @Field(() => [String], { nullable: true })
  names?: string[]

  @Field(() => [String], { nullable: true })
  tags?: string[]

  @Field({ nullable: true })
  search?: string
}
