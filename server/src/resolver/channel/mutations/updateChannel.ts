import { ArgsType, Field, ID, InputType } from 'type-graphql'
import { Channel } from '@/entity'
import { Context } from '@/types'

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
  { channelId, name, isPrivate, isRead, beforeChannelId }: UpdateChannelInput
): Promise<Channel> {
  liveQueryStore.invalidate(`Channel:${channelId}`)
}
