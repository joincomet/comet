import { Field, Int, ObjectType } from 'type-graphql'
import { Server } from '@/server/Server.entity'

@ObjectType()
export class ServersResponse {
  @Field(() => Int, { nullable: true })
  page?: number

  @Field(() => Int, { nullable: true })
  nextPage?: number

  @Field(() => [Server])
  servers: Server[]
}
