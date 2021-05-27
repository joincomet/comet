import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Channel, ServerPermission, User } from '@/entity'
import {getReorderPosition, logger} from '@/util'

@InputType()
export class MoveChannelInput {
  @Field(() => ID)
  channelId: string

  @Field(() => ID, { nullable: true })
  beforeChannelId?: string
}

export async function moveChannel(
  { em, userId, liveQueryStore }: Context,
  { channelId, beforeChannelId }: MoveChannelInput
): Promise<Channel> {
  logger('moveChannel')
  const user = await em.findOneOrFail(User, userId)
  const channel = await em.findOneOrFail(Channel, channelId, ['server'])
  await user.checkServerPermission(
    em,
    channel.server.id,
    ServerPermission.ManageChannels
  )

  const channels = await em.find(
    Channel,
    { server: channel.server },
    { orderBy: { position: 'ASC' } }
  )
  const firstChannel = channels[0]
  const beforeChannel = beforeChannelId
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

  await em.persistAndFlush(channel)
  liveQueryStore.invalidate(`Channel:${channelId}`)
  return channel
}
