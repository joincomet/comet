import { ArgsType, Field, ID, Publisher } from 'type-graphql'
import { Context } from '@/types'

export interface TypingPayload {
  userId: string
  groupId: string
  channelId: string
  username: string
}

@ArgsType()
export class TypingArgs {
  @Field(() => ID, { nullable: true })
  channelId?: string

  @Field(() => ID, { nullable: true })
  groupId?: string

  @Field(() => ID, { nullable: true })
  userId?: string
}

export async function startTyping(
  { user }: Context,
  { channelId, groupId, userId }: TypingArgs,
  notifyUserStartedTyping: Publisher<TypingPayload>
): Promise<boolean> {
  await notifyUserStartedTyping({
    username: user.username,
    userId,
    groupId,
    channelId
  })
  return true
}
