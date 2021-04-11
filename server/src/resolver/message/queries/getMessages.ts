import { ArgsType, Field, ID, Int, ObjectType, Publisher } from 'type-graphql'
import { Max, Min } from 'class-validator'
import { Channel, Group, Message, User } from '@/entity'
import { Context } from '@/types'
import { DmPayload } from '@/resolver/message/subscriptions/DmPayload'
import { FilterQuery, QueryOrder } from '@mikro-orm/core'

@ArgsType()
export class GetMessagesArgs {
  @Field(() => ID, { nullable: true })
  channelId?: string

  @Field(() => ID, { nullable: true })
  groupId?: string

  @Field(() => ID, { nullable: true })
  userId?: string

  @Field({ defaultValue: false })
  pinned: boolean

  @Field({ nullable: true })
  initialTime: Date

  @Field(() => Int, { defaultValue: 100 })
  @Min(1)
  @Max(100)
  pageSize = 100

  @Field(() => Int, { defaultValue: 0 })
  @Min(0)
  page = 0
}

@ObjectType()
export class GetMessagesResponse {
  @Field()
  hasMore: boolean

  @Field(() => [Message])
  messages: Message[]
}

export async function getMessages(
  { em, user }: Context,
  {
    channelId,
    groupId,
    userId,
    pinned,
    initialTime,
    pageSize,
    page
  }: GetMessagesArgs,
  notifyDmOpened: Publisher<DmPayload>
): Promise<GetMessagesResponse[]> {
  const channel = channelId ? await em.findOneOrFail(Channel, channelId) : null
  const group = groupId ? await em.findOneOrFail(Group, groupId) : null
  const toUser = userId ? await em.findOneOrFail(User, userId) : null

  if (!channel && !group && !toUser)
    throw new Error('error.message.missingArgs')

  const where: FilterQuery<Message> = {
    isDeleted: false
  }
  if (pinned) where.isPinned = true
  if (channel) {
    where.channel = channel
  } else if (group) {
    where.group = group
  } else if (toUser) {
    const [myData, theirData] = await user.getFriendData(em, userId)
    myData.showChat = true
    await em.persistAndFlush([myData, theirData])
    await notifyDmOpened({ userId: user.id, toUserId: toUser.id })

    where['$or'] = [
      { author: user, toUser },
      { author: toUser, toUser: user }
    ]
  }

  if (initialTime) {
    where.createdAt = {
      $lte: initialTime
    }
  }

  const messages = (
    await em.find(
      Message,
      where,
      ['author'],
      { createdAt: QueryOrder.DESC },
      pageSize + 1, // get one extra to determine hasMore
      page * pageSize
    )
  ).reverse()

  const hasMore = messages.length > pageSize
  return [
    {
      hasMore,
      messages: hasMore ? messages.slice(1, messages.length) : messages
    } as GetMessagesResponse
  ]
}
