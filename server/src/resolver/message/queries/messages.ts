import { ArgsType, Field, ID, ObjectType } from 'type-graphql'
import { Max, Min } from 'class-validator'
import { Message, User } from '@/entity'
import { Context } from '@/types'
import { FilterQuery, QueryOrder } from '@mikro-orm/core'
import { GraphQLPositiveInt } from 'graphql-scalars'
import {logger} from "@/util";

@ArgsType()
export class MessagesArgs {
  @Field(() => ID, { nullable: true })
  channelId?: string

  @Field(() => ID, { nullable: true })
  groupId?: string

  @Field(() => ID, { nullable: true })
  userId?: string

  @Field({ defaultValue: false })
  pinned: boolean = false

  @Field(() => ID, { nullable: true })
  cursor?: string

  @Field(() => GraphQLPositiveInt, { defaultValue: 100 })
  @Min(1)
  @Max(100)
  limit: number = 100
}

@ObjectType()
export class MessagesResponse {
  @Field()
  hasMore: boolean

  @Field(() => [Message])
  messages: Message[]
}

export async function messages(
  { em, userId: currentUserId }: Context,
  { channelId, groupId, userId, pinned, limit, cursor }: MessagesArgs
): Promise<MessagesResponse> {
  logger('messages')
  if (!channelId && !groupId && !userId)
    throw new Error('error.message.missingArgs')

  const where: FilterQuery<Message> = {
    isDeleted: false
  }
  if (pinned) where.isPinned = true
  if (channelId) {
    where.channel = channelId
  } else if (groupId) {
    where.group = groupId
  } else if (userId) {
    if (!currentUserId) throw new Error('Must be logged in to use DMs')
    const currentUser = await em.findOneOrFail(User, currentUserId)
    const toUser = await em.findOneOrFail(User, userId)
    where['$or'] = [
      { author: currentUser, toUser },
      { author: toUser, toUser: currentUser }
    ]
  }
  if (cursor) where.id = { $lt: cursor }

  const messages = (
    await em.find(Message, where, {
      populate: ['author', 'mentionedUsers'],
      orderBy: { id: QueryOrder.DESC },
      limit: limit + 1
    })
  ).reverse()
  const hasMore = messages.length > limit
  return {
    hasMore,
    messages: hasMore ? messages.slice(1, messages.length) : messages
  } as MessagesResponse
}
