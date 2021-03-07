import { Entity, Enum, ManyToOne, PrimaryKeyType } from '@mikro-orm/core'
import { ChatChannel } from '@/entity'
import { ServerRole } from '@/entity/ServerRole'
import { ChannelPermission } from '@/types/ChannelPermission'

export const defaultChannelPermissions = [
  ChannelPermission.ViewChannel,
  ChannelPermission.SendMessages,
  ChannelPermission.EmbedLinks,
  ChannelPermission.AttachFiles
]

@Entity()
export class ChannelRolePermissions {
  @ManyToOne({ entity: () => ChatChannel, primary: true })
  channel: ChatChannel

  @ManyToOne({ entity: () => ServerRole, primary: true })
  role: ServerRole;

  [PrimaryKeyType]: [string, string, string]

  @Enum({
    items: () => ChannelPermission,
    array: true,
    default: defaultChannelPermissions
  })
  permissions: ChannelPermission[] = defaultChannelPermissions
}
