import { Context } from '@/types'
import { ArgsType, Field, ID, Publisher } from 'type-graphql'
import { Channel, Server, ServerPermission } from '@/entity'
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
  { em, user }: Context,
  { serverId, name, isPrivate }: CreateChannelArgs,
  notifyChannelsUpdated: Publisher<{ serverId: string }>
): Promise<Channel> {
  await user.checkServerPermission(
    em,
    serverId,
    ServerPermission.ManageChannels
  )

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
  await notifyChannelsUpdated({ serverId: server.id })
  return channel
}
