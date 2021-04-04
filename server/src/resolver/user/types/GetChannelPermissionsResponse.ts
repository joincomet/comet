import { Field, ObjectType } from 'type-graphql'
import { ChannelPermission } from '@/types'

@ObjectType()
export class GetChannelPermissionsResponse {
  @Field(() => [ChannelPermission])
  allowedPermissions: ChannelPermission[]

  @Field(() => [ChannelPermission])
  deniedPermissions: ChannelPermission[]
}
