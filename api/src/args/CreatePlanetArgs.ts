import { ArgsType, Field } from 'type-graphql'
import { ArrayMaxSize, ArrayMinSize, Length, Matches } from 'class-validator'

@ArgsType()
export class CreatePlanetArgs {
  @Field()
  @Matches(/^[a-zA-Z0-9_]+$/)
  @Length(3, 21)
  name: string

  @Field()
  @Length(1, 50000)
  description: string

  @Field()
  galaxy: string
}
