import { Field, Int, ObjectType } from 'type-graphql'
import { Server } from '@/entity/Server'

@ObjectType()
export class GetServersResponse {
  @Field(() => Int, { nullable: true })
  page?: number

  @Field(() => Int, { nullable: true })
  nextPage?: number

  @Field(() => [Server])
  servers: Server[]
}
