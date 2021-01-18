import { ArgsType, Field, Int } from 'type-graphql'
import { PlanetSort } from '@/planet/PlanetSort'
import { Max, Min } from 'class-validator'
import { Galaxy } from '@/Galaxy'

@ArgsType()
export class PlanetsArgs {
  @Field(() => PlanetSort, { defaultValue: PlanetSort.AZ })
  sort: PlanetSort = PlanetSort.AZ

  @Field({ defaultValue: false })
  joinedOnly: boolean

  @Field(() => Galaxy, { nullable: true })
  galaxy?: Galaxy

  @Field(() => Int, { nullable: true })
  @Min(0)
  page?: number

  @Field(() => Int, { defaultValue: 20 })
  @Min(1)
  @Max(100)
  pageSize = 20
}
