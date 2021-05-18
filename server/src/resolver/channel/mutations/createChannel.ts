import { Context } from '@/types'
import { Field, ID, InputType } from 'type-graphql'
import { Channel, ChannelType, Server, ServerPermission, User } from '@/entity'
import { handleUnderscore, ReorderUtils } from '@/util'

@InputType()
export class CreateChannelInput {
  @Field(() => ID)
  serverId: string

  @Field()
  name: string

  @Field(() => ChannelType, { defaultValue: ChannelType.Public })
  type: ChannelType = ChannelType.Public
}

export async function createChannel(
  { em, userId, liveQueryStore }: Context,
  { serverId, name, type }: CreateChannelInput
): Promise<Channel> {
  const user = await em.findOneOrFail(User, userId)
  await user.checkServerPermission(
    em,
    serverId,
    ServerPermission.ManageChannels
  )

  const server = await em.findOneOrFail(Server, serverId, [
    'systemMessagesChannel'
  ])

  const foundChannel = await em.findOne(Channel, {
    server,
    name: { $ilike: handleUnderscore(name) }
  })
  if (foundChannel) throw new Error('Channel with that name already exists')

  const firstChannel = await em.findOne(
    Channel,
    { server },
    { orderBy: { position: 'ASC' } }
  )

  const channel = em.create(Channel, {
    name,
    server,
    type,
    position: firstChannel
      ? ReorderUtils.positionBefore(firstChannel.position)
      : ReorderUtils.FIRST_POSITION
  })

  if (!server.systemMessagesChannel) server.systemMessagesChannel = channel

  await em.persistAndFlush([channel, server])
  liveQueryStore.invalidate(`Server:${serverId}`)
  return channel
}
