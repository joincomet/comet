import { Field, ID, InputType } from 'type-graphql'
import { Channel, ChannelUser, ServerPermission } from '@/entity'
import { Context } from '@/types'
import { QueryOrder } from '@mikro-orm/core'
import { getReorderPosition } from '@/util'

@InputType()
export class UpdateChannelInput {
  @Field(() => ID)
  channelId: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  isPrivate?: boolean

  @Field({ nullable: true })
  isRead?: boolean

  @Field({ defaultValue: false })
  isDeleted: boolean = false

  @Field(() => ID, { nullable: true })
  beforeChannelId?: string
}

export async function updateChannel(
  { em, user, liveQueryStore }: Context,
  {
    channelId,
    name,
    isPrivate,
    isRead,
    beforeChannelId,
    isDeleted
  }: UpdateChannelInput
): Promise<Channel> {
  const channel = await em.findOneOrFail(Channel, channelId, ['server.owner'])

  if (name || isPrivate || beforeChannelId || isDeleted) {
    await user.checkServerPermission(
      em,
      channel.server.id,
      ServerPermission.ManageChannels
    )

    // Update properties
    em.assign(channel, {
      name: name ?? channel.name,
      isPrivate: isPrivate ?? channel.isPrivate,
      isDeleted
    })

    // Reorder channel
    if (typeof beforeChannelId === 'string') {
      const channels = await em.find(
        Channel,
        { server: channel.server },
        { orderBy: { position: QueryOrder.ASC } }
      )
      const firstChannel = channels[0]
      const beforeChannel =
        beforeChannelId !== '0'
          ? channels.find(c => c.id === beforeChannelId)
          : null
      const afterChannel = beforeChannel
        ? channels[channels.indexOf(beforeChannel) + 1]
        : null

      channel.position = getReorderPosition(
        firstChannel?.position,
        beforeChannel?.position,
        afterChannel?.position
      )
    }
  }

  // Mark channel read
  if (isRead) {
    let channelUser = await em.findOne(ChannelUser, { user, channel })
    if (!channelUser) channelUser = em.create(ChannelUser, { user, channel })
    channelUser.lastViewAt = new Date()
    channelUser.mentionCount = 0
    em.persist(channelUser)
    channel.isUnread = false
    channel.mentionCount = 0
  }

  await em.persistAndFlush(channel)
  liveQueryStore.invalidate(`Channel:${channelId}`)
  return channel
}
