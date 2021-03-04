import { Arg, Authorized, Ctx, ID, Mutation } from 'type-graphql'
import { Server } from '@/server/Server.entity'
import { uploadImage } from '@/util/S3Storage'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { User } from '@/user/User.entity'
import { Post } from '@/post/Post.entity'
import { Comment } from '@/comment/Comment.Entity'
import { handleUnderscore } from '@/util/handleUnderscore'
import { Context } from '@/types/Context'
import { Notification } from '@/notification/Notification.Entity'
import { ServerCategory } from '@/types/ServerCategory'

export class ModerationResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async removePost(
    @Arg('postId', () => ID) postId: string,
    @Arg('reason') reason: string,
    @Ctx() { em, user }: Context
  ) {
    const post = await em.findOne(Post, postId, ['server.moderators'])
    if (!post.server.moderators.contains(user))
      throw new Error('You are not a moderator')

    em.assign(post, {
      removed: true,
      removedReason: reason,
      pinned: false,
      pinRank: null
    })
    await em.persistAndFlush(post)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async pinPost(
    @Arg('postId', () => ID) postId: string,
    @Ctx() { em, user }: Context
  ) {
    const post = await em.findOne(Post, postId, ['server.moderators'])
    if (!post.server.moderators.contains(user))
      throw new Error('You are not a moderator')

    post.pinned = true
    await em.persistAndFlush(post)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unpinPost(
    @Arg('postId', () => ID) postId: string,
    @Ctx() { em, user }: Context
  ) {
    const post = await em.findOne(Post, postId, ['server.moderators'])
    if (!post.server.moderators.contains(user))
      throw new Error('You are not a moderator')

    post.pinned = false
    await em.persistAndFlush(post)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async removeComment(
    @Arg('commentId', () => ID) commentId: string,
    @Arg('reason') reason: string,
    @Ctx() { em, user }: Context
  ) {
    const comment = await em.findOne(Comment, commentId, [
      'post.server.moderators'
    ])
    if (!comment.post.server.moderators.contains(user))
      throw new Error('You are not a moderator')

    em.assign(comment, {
      removed: true,
      removedReason: reason,
      pinned: false,
      pinRank: null
    })

    await em.nativeDelete(Notification, { comment })
    comment.post.commentCount--
    await em.persistAndFlush(comment)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async banUserFromserver(
    @Arg('serverId', () => ID) serverId: string,
    @Arg('bannedId', () => ID) bannedId: string,
    @Ctx() { em, user }: Context
  ) {
    const server = await em.findOne(Server, serverId, ['moderators'])
    if (!server.moderators.contains(user))
      throw new Error('You are not a moderator')

    const bannedUser = await em.findOne(User, bannedId)
    server.bannedUsers.add(bannedUser)
    server.users.remove(bannedUser)
    await em.persistAndFlush(server)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unbanUserFromserver(
    @Arg('serverId', () => ID) serverId: string,
    @Arg('bannedId', () => ID) bannedId: string,
    @Ctx() { em, user }: Context
  ) {
    const server = await em.findOne(Server, serverId, ['moderators'])
    if (!server.moderators.contains(user))
      throw new Error('You are not a moderator')

    const bannedUser = await em.findOne(User, bannedId)
    server.bannedUsers.remove(bannedUser)
    await em.persistAndFlush(server)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async uploadServerAvatar(
    @Arg('serverId', () => ID) serverId: string,
    @Arg('file', () => GraphQLUpload) file: FileUpload,
    @Ctx() { em, user }: Context
  ) {
    const server = await em.findOne(Server, serverId, ['moderators'])

    if (!server.moderators.contains(user))
      throw new Error('You are not a moderator')

    const { createReadStream, mimetype } = await file
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')
    server.avatarUrl = await uploadImage(createReadStream(), file.mimetype, {
      width: 256,
      height: 256
    })
    await em.persistAndFlush(server)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async uploadServerBanner(
    @Arg('serverId', () => ID) serverId: string,
    @Arg('file', () => GraphQLUpload) file: FileUpload,
    @Ctx() { em, user }: Context
  ) {
    const server = await em.findOne(Server, serverId, ['moderators'])
    if (!server.moderators.contains(user))
      throw new Error('You are not a moderator')

    const { createReadStream, mimetype } = await file
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')
    server.bannerUrl = await uploadImage(createReadStream(), file.mimetype, {
      width: 1920
    })
    await em.persistAndFlush(server)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async addModerator(
    @Arg('serverId', () => ID) serverId: string,
    @Arg('username') username: string,
    @Ctx() { em, user }: Context
  ) {
    const server = await em.findOne(Server, serverId, ['moderators'])
    if (!server.moderators.contains(user))
      throw new Error('You are not a moderator')

    const addedUser = await em.findOne(User, {
      username: { $ilike: handleUnderscore(username) }
    })
    if (!addedUser) throw new Error('User not found')
    if (
      server.moderators
        .getItems()
        .map(m => m.id)
        .find(id => id === addedUser.id)
    )
      throw new Error(`${addedUser.username} is already a moderator`)
    server.moderators.add(addedUser)
    await em.persistAndFlush(server)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async editServerDescription(
    @Arg('serverId', () => ID) serverId: string,
    @Arg('description') description: string,
    @Ctx() { em, user }: Context
  ) {
    const server = await em.findOne(Server, serverId, ['moderators'])
    if (!server.moderators.contains(user))
      throw new Error('You are not a moderator')

    if (description.length > 1000)
      throw new Error('Description cannot be longer than 1000 characters')

    server.description = description
    await em.persistAndFlush(server)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async setServerCategory(
    @Arg('serverId', () => ID) serverId: string,
    @Arg('category', () => ServerCategory) category: ServerCategory,
    @Ctx() { em }: Context
  ) {
    await em
      .createQueryBuilder(Server)
      .update({ category })
      .where({ id: serverId })
      .execute()
    return true
  }
}
