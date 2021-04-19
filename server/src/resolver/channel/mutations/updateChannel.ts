import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Channel, ServerPermission, User } from '@/entity'

@InputType()
export class UpdateChannelInput {
  @Field(() => ID)
  channelId: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  isPrivate?: boolean
}

export async function updateChannel(
  { em, userId, liveQueryStore }: Context,
  { channelId, name, isPrivate }: UpdateChannelInput
): Promise<Channel> {
  const user = await em.findOneOrFail(User, userId)
  const channel = await em.findOneOrFail(Channel, channelId, ['server'])
  await user.checkServerPermission(
    em,
    channel.server.id,
    ServerPermission.ManageChannels
  )
  em.assign(channel, {
    name: name ?? channel.name,
    isPrivate: isPrivate ?? channel.isPrivate
  })
  await em.persistAndFlush(channel)
  liveQueryStore.invalidate(`Channel:${channelId}`)
  return channel
}
