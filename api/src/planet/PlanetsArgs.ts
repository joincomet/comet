import { ArgsType, Field } from 'type-graphql'
import { PlanetSort } from '@/planet/PlanetSort'

@ArgsType()
export class PlanetsArgs {
  @Field(() => PlanetSort, { defaultValue: PlanetSort.AZ })
  sort: PlanetSort = PlanetSort.AZ

  @Field({ defaultValue: false })
  joinedOnly: boolean

  @Field(() => [String], { nullable: true })
  galaxies?: string[]

  @Field({ nullable: true })
  search?: string
}
