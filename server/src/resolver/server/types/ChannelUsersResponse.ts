import { Field, ObjectType } from 'type-graphql'
import { User } from '@/entity'

@ObjectType()
export class ChannelUsersResponse {
  @Field()
  role: string

  @Field(() => [User])
  users: User[]
}
