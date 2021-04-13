import { Entity, Enum, ManyToOne, PrimaryKeyType } from '@mikro-orm/core'
import { Channel } from '@/entity'
import { Role } from '@/entity/server/Role'
import { ChannelPermission } from '@/entity/channel/ChannelPermission'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
@Entity()
export class ChannelRole {
  @Field(() => Channel)
  @ManyToOne({ entity: () => Channel, primary: true })
  channel: Channel

  @ManyToOne({ entity: () => Role, primary: true })
  role: Role;

  [PrimaryKeyType]: [string, string]

  @Field(() => [ChannelPermission])
  @Enum({
    items: () => ChannelPermission,
    array: true
  })
  allowedPermissions: ChannelPermission[] = []

  @Field(() => [ChannelPermission])
  @Enum({
    items: () => ChannelPermission,
    array: true
  })
  deniedPermissions: ChannelPermission[] = []
}
