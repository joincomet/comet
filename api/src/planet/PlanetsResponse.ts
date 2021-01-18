import { Field, Int, ObjectType } from 'type-graphql'
import { Planet } from '@/planet/Planet.Entity'

@ObjectType()
export class PlanetsResponse {
  @Field(() => Int, { nullable: true })
  page?: number

  @Field(() => Int, { nullable: true })
  nextPage?: number

  @Field(() => [Planet])
  planets: Planet[]
}
