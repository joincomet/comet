import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Channel, ChannelType, ServerPermission, User } from '@/entity'
import { handleUnderscore } from '@/util'

@InputType()
export class UpdateChannelInput {
  @Field(() => ID)
  channelId: string

  @Field({ nullable: true })
  name?: string

  @Field(() => ChannelType, { nullable: true })
  type?: boolean
}

export async function updateChannel(
  { em, userId, liveQueryStore }: Context,
  { channelId, name, type }: UpdateChannelInput
): Promise<Channel> {
  const user = await em.findOneOrFail(User, userId)
  const channel = await em.findOneOrFail(Channel, channelId, ['server'])
  await user.checkServerPermission(
    em,
    channel.server.id,
    ServerPermission.ManageChannels
  )

  if (name) {
    const foundChannel = await em.findOne(Channel, {
      server: channel.server,
      name: { $ilike: handleUnderscore(name) }
    })
    if (foundChannel) throw new Error('Channel with that name already exists')
  }

  em.assign(channel, {
    name: name ?? channel.name,
    type: type ?? channel.type
  })
  await em.persistAndFlush(channel)
  liveQueryStore.invalidate(`Channel:${channelId}`)
  return channel
}
