import { Field, ObjectType } from 'type-graphql'
import { User } from '@/entity'
import { ChannelPermission } from '@/types'

@ObjectType()
export class GetChannelPermissionsResponse {
  @Field(() => [ChannelPermission])
  allowedPermissions: ChannelPermission[]

  @Field(() => [ChannelPermission])
  deniedPermissions: ChannelPermission[]
}
