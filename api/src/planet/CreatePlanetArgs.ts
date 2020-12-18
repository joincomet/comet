import { ArgsType, Field } from 'type-graphql'
import { Length, Matches, ArrayMinSize, ArrayMaxSize } from 'class-validator'
import { IsGalaxy } from '@/galaxies'

@ArgsType()
export class CreatePlanetArgs {
  @Field()
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Planet name can only have letters, numbers, and underscores.'
  })
  @Length(3, 21, {
    message: 'Planet name must be between 3 and 21 characters.'
  })
  name: string

  @Field()
  @Length(1, 100000, {
    message: 'Planet description must be no longer than 100000 characters.'
  })
  description: string

  @Field(() => [String])
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @IsGalaxy({
    message: 'Galaxy does not exist',
    each: true
  })
  galaxies: string[]
}
