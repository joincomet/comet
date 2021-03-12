import { Entity, Enum, ManyToOne, PrimaryKeyType } from '@mikro-orm/core'
import { ChatChannel } from '@/entity'
import { ServerRole } from '@/entity/ServerRole'
import { ChannelPermission } from '@/types/ChannelPermission'

@Entity()
export class ChatChannelRole {
  @ManyToOne({ entity: () => ChatChannel, primary: true })
  channel: ChatChannel

  @ManyToOne({ entity: () => ServerRole, primary: true })
  role: ServerRole;

  [PrimaryKeyType]: [string, string]

  @Enum({
    items: () => ChannelPermission,
    array: true,
    default: []
  })
  allowedPermissions: ChannelPermission[] = []

  @Enum({
    items: () => ChannelPermission,
    array: true,
    default: []
  })
  deniedPermissions: ChannelPermission[] = []
}
