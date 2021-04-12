import { Context } from '@/types'
import { ArgsType, Field, ID, ObjectType, Publisher } from 'type-graphql'
import { Channel, Server } from '@/entity'
import { ChannelPayload } from '@/resolver/channel/subscriptions/ChannelPayload'
import { QueryOrder } from '@mikro-orm/core'
import { ReorderUtils } from '@/util'

@ArgsType()
export class CreateChannelArgs {
  @Field(() => ID)
  serverId: string

  @Field()
  name: string

  @Field({ defaultValue: false })
  isPrivate: boolean
}

export async function createChannel(
  { em }: Context,
  { serverId, name, isPrivate }: CreateChannelArgs,
  notifyChannelCreated: Publisher<ChannelPayload>
): Promise<Channel> {
  const server = await em.findOneOrFail(Server, serverId)

  const firstChannel = await em.findOne(
    Channel,
    { server },
    { orderBy: { position: QueryOrder.ASC } }
  )

  const channel = em.create(Channel, {
    name,
    server,
    isPrivate,
    position: firstChannel
      ? ReorderUtils.positionBefore(firstChannel.position)
      : ReorderUtils.FIRST_POSITION
  })

  await em.persistAndFlush(channel)
  await notifyChannelCreated({ serverId: server.id, channelId: channel.id })
  return channel
}
