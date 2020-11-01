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
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'

@Resolver()
export class NotificationResolver {
  @InjectRepository(Notification)
  readonly notificationRepository: Repository<Notification>

  @Query(() => [Notification])
  async notifications(
    @Arg('unreadOnly', { defaultValue: false }) unreadOnly: boolean,
    @Ctx() { userId }: Context
  ) {
    if (!userId) return []

    const qb = this.notificationRepository
      .createQueryBuilder('notification')
      .leftJoinAndSelect('notification.fromUser', 'fromUser')
      .leftJoinAndSelect('notification.post', 'post')
      .leftJoinAndSelect('post.planet', 'planet')
      .leftJoinAndSelect(
        'notification.comment',
        'comment',
        'comment.deleted = false'
      )
      .addOrderBy('notification.createdAt', 'DESC')
      .andWhere('notification.toUserId = :userId', { userId })

    if (unreadOnly) qb.andWhere('notification.read = false')

    const notifications = await qb.getMany()

    return notifications.filter(
      notification =>
        notification.comment !== null && notification.comment !== undefined
    )
  }

  @Authorized()
  @Mutation(() => Boolean)
  async markNotificationRead(
    @Arg('id', () => ID) id: number,
    @Ctx() { userId }: Context
  ) {
    await this.notificationRepository
      .createQueryBuilder()
      .update()
      .set({ read: true })
      .where('id = :id', { id })
      .andWhere('toUserId = :userId', { userId })
      .execute()
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async markAllNotificationsRead(@Ctx() { userId }: Context) {
    await this.notificationRepository
      .createQueryBuilder()
      .update()
      .set({ read: true })
      .where('toUserId = :userId', { userId })
      .execute()
    return true
  }
}
