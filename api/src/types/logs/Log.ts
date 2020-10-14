import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export abstract class Log {
  @Field(() => ID)
  userId: number
}
