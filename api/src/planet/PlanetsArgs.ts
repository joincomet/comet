import { ArgsType, Field } from 'type-graphql'
import { PaginationArgs } from '@/PaginationArgs'
import { PlanetSort } from '@/planet/PlanetSort'

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
