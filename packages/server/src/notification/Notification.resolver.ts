import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver
} from 'type-graphql'
import { Notification } from '@/notification/Notification.Entity'
import { Context } from '@/Context'
import { QueryOrder } from '@mikro-orm/core'
import { User } from '@/user/User.entity'

@Resolver()
export class NotificationResolver {
  @Query(() => [Notification])
  async notifications(
    @Arg('unreadOnly', { defaultValue: false }) unreadOnly: boolean,
    @Ctx() { userId, em }: Context
  ) {
    if (!userId) return []
    const user = await em.findOne(User, userId)
    return em.find(
      Notification,
      unreadOnly
        ? { $and: [{ toUser: user }, { read: false }] }
        : { toUser: user },
      ['fromUser', 'post.author', 'post.planet', 'comment.author'],
      { createdAt: QueryOrder.DESC }
    )
  }

  @Authorized()
  @Mutation(() => Boolean)
  async markNotificationRead(
    @Arg('id', () => ID) id: bigint,
    @Ctx() { userId, em }: Context
  ) {
    await em
      .createQueryBuilder(Notification)
      .update({ read: true })
      .where({ id })
      .andWhere({ toUserId: userId })
      .execute()
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async markAllNotificationsRead(@Ctx() { userId, em }: Context) {
    await em
      .createQueryBuilder(Notification)
      .update({ read: true })
      .where({ toUserId: userId })
      .execute()
    return true
  }
}
