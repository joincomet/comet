import { Context } from '@/types'
import { ArgsType, Field, ID, ObjectType, Publisher } from 'type-graphql'
import { Channel } from '@/entity'

@ArgsType()
export class EditChannelArgs {
  @Field(() => ID)
  channelId: string

  @Field()
  name: string

  @Field({ defaultValue: false })
  isPrivate: boolean
}

export async function editChannel(
  { em }: Context,
  { channelId, name, isPrivate }: EditChannelArgs,
  notifyChannelUpdated: Publisher<{ channelId: string }>
): Promise<Channel> {
  const channel = await em.findOneOrFail(Channel, channelId, ['server'])
  em.assign(channel, { name, isPrivate })
  await em.persistAndFlush(channel)
  await notifyChannelUpdated({ channelId: channel.id })
  return channel
}
