import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class UserBadges {
  @Field()
  og?: boolean = false
}
