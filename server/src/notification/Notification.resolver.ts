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
import { Context } from '@/types/Context'
import { QueryOrder } from '@mikro-orm/core'
import { User } from '@/user/User.entity'

@Resolver()
export class NotificationResolver {
  @Authorized()
  @Query(() => [Notification])
  async getNotifications(
    @Arg('unreadOnly', { defaultValue: false }) unreadOnly: boolean,
    @Ctx() { user, em }: Context
  ) {
    return em.find(
      Notification,
      unreadOnly ? { $and: [{ user }, { read: false }] } : { user },
      ['user', 'comment.author', 'comment.post.author'],
      { createdAt: QueryOrder.DESC }
    )
  }

  @Authorized()
  @Mutation(() => Boolean)
  async markNotificationRead(
    @Arg('id', () => ID) id: string,
    @Ctx() { user, em }: Context
  ) {
    const notif = await em.findOne(Notification, id)
    if (!notif) throw new Error('Notification not found')
    if (notif.user !== user) throw new Error('This is not your notification')
    notif.read = true
    await em.persistAndFlush(notif)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async markAllNotificationsRead(@Ctx() { user, em }: Context) {
    await em
      .createQueryBuilder(Notification)
      .update({ read: true })
      .where({ user })
      .execute()
    return true
  }
}
