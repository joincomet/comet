import { Field, ObjectType } from 'type-graphql'
import { User } from '@/user/User.Entity'

@ObjectType()
export class LoginResponse {
  @Field(() => User)
  user: User

  @Field()
  accessToken: string
}
