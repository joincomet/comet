import { ArgsType, Field } from 'type-graphql'
import { PlanetSort } from '@/planet/PlanetSort'

@ArgsType()
export class PlanetsArgs {
  @Field(() => PlanetSort, { defaultValue: PlanetSort.AZ })
  sort: PlanetSort = PlanetSort.AZ

  @Field({ defaultValue: false })
  joinedOnly: boolean

  @Field({ defaultValue: false })
  featured: boolean

  @Field({ nullable: true })
  galaxy?: string

  @Field({ nullable: true })
  search?: string
}
