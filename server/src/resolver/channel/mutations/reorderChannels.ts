import { Context } from '@/types'
import { ArgsType, Field, ID, ObjectType, Publisher } from 'type-graphql'
import { Channel } from '@/entity'
import { ReorderUtils } from '@/util'
import { QueryOrder } from '@mikro-orm/core'
import { getServerChannels } from '@/resolver/channel/queries/getServerChannels'

@ArgsType()
export class ReorderChannelArgs {
  @Field(() => ID)
  channelId: string

  @Field(() => ID, { nullable: true })
  beforeChannelId: string
}

export async function reorderChannels(
  { em, user }: Context,
  { channelId, beforeChannelId }: ReorderChannelArgs,
  notifyChannelsReordered: Publisher<{ serverId: string }>
): Promise<Channel[]> {
  const channel = await em.findOneOrFail(Channel, channelId, ['server'])
  const beforeChannel = beforeChannelId
    ? await em.findOneOrFail(Channel, beforeChannelId)
    : null

  if (beforeChannel) {
    channel.position = ReorderUtils.positionAfter(beforeChannel.position)
  } else {
    const firstChannel = await em.findOne(
      Channel,
      { server: channel.server },
      { orderBy: { position: QueryOrder.ASC } }
    )
    channel.position = firstChannel
      ? ReorderUtils.positionBefore(firstChannel.position)
      : ReorderUtils.FIRST_POSITION
  }

  await em.persistAndFlush(channel)
  await notifyChannelsReordered({ serverId: channel.server.id })
  return getServerChannels({ em, user }, channel.server.id)
}
