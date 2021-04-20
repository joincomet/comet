import { Field, ObjectType } from 'type-graphql'
import { User } from '@/entity'
import { GraphQLJWT } from 'graphql-scalars'

@ObjectType()
export class LoginResponse {
  @Field(() => User)
  user: User

  @Field(() => GraphQLJWT)
  accessToken: string
}
