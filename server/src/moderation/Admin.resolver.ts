import { Arg, Authorized, Ctx, ID, Mutation } from 'type-graphql'
import { User } from '@/user/User.entity'
import { Context } from '@/types/Context'
import { Post } from '@/post/Post.entity'
import { Comment } from '@/comment/Comment.Entity'
import { Notification } from '@/notification/Notification.Entity'

export class AdminResolver {
  @Authorized('ADMIN')
  @Mutation(() => Boolean)
  async banUser(
    @Arg('bannedId', () => ID) bannedId: string,
    @Arg('reason') reason: string,
    @Ctx() { em }: Context
  ) {
    await em
      .createQueryBuilder(User)
      .update({
        banned: true,
        banReason: reason,
        servers: []
      })
      .where({ id: bannedId })
      .execute()
    return true
  }

  @Authorized('ADMIN')
  @Mutation(() => Boolean)
  async unbanUser(
    @Arg('bannedId', () => ID) bannedId: string,
    @Ctx() { em }: Context
  ) {
    await em
      .createQueryBuilder(User)
      .update({
        banned: false,
        banReason: null
      })
      .where({ id: bannedId })
      .execute()
    return true
  }

  @Authorized('ADMIN')
  @Mutation(() => Boolean)
  async banAndPurgeUser(
    @Arg('bannedId', () => ID) bannedId: string,
    @Arg('reason') reason: string,
    @Ctx() { em }: Context
  ) {
    const bannedUser = em.assign(await em.findOne(User, bannedId), {
      banned: true,
      banReason: reason,
      servers: []
    })

    await em
      .createQueryBuilder(Post)
      .update({
        removed: true,
        removedReason: reason,
        pinned: false,
        pinRank: null
      })
      .where({ author: bannedUser })
      .execute()

    await em
      .createQueryBuilder(Comment)
      .update({
        removed: true,
        removedReason: reason,
        pinned: false,
        pinRank: null
      })
      .where({ author: bannedUser })
      .execute()

    await em.persistAndFlush([bannedUser])
    // await em.nativeDelete(Notification, { fromUser: bannedUser })
    return true
  }
}
