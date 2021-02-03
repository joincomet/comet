import { ArgsType, Field } from 'type-graphql'
import { Length, Matches, IsOptional } from 'class-validator'
import { Galaxy } from '@/Galaxy'

@ArgsType()
export class CreatePlanetArgs {
  @Field()
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Planet name can only have letters, numbers, and underscores.'
  })
  @Length(3, 21, {
    message: 'Planet name must be 3-21 characters.'
  })
  name: string

  @Field({ nullable: true })
  @IsOptional()
  @Length(1, 300, {
    message: 'Custom name must be 1-300 characters.'
  })
  customName?: string

  @Field()
  @Length(1, 100000, {
    message: 'Planet description must be no longer than 100000 characters.'
  })
  description: string

  @Field(() => Galaxy)
  galaxy: Galaxy
}
