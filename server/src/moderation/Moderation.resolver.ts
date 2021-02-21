import { Arg, Authorized, Ctx, ID, Mutation } from 'type-graphql'
import { Planet } from '@/planet/Planet.entity'
import { uploadImage } from '@/S3Storage'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { User } from '@/user/User.entity'
import { Post } from '@/post/Post.entity'
import { Comment } from '@/comment/Comment.Entity'
import { handleUnderscore } from '@/handleUnderscore'
import { Context } from '@/Context'
import { Notification } from '@/notification/Notification.Entity'
import { Galaxy } from '@/Galaxy'

export class ModerationResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async removePost(
    @Arg('postId', () => ID) postId: string,
    @Arg('reason') reason: string,
    @Ctx() { em, userId }: Context
  ) {
    const user = await em.findOne(User, userId)
    const post = await em.findOne(Post, postId, ['planet.moderators'])
    if (!post.planet.moderators.contains(user))
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
    @Ctx() { em, userId }: Context
  ) {
    const user = await em.findOne(User, userId)
    const post = await em.findOne(Post, postId, ['planet.moderators'])
    if (!post.planet.moderators.contains(user))
      throw new Error('You are not a moderator')

    post.pinned = true
    await em.persistAndFlush(post)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unpinPost(
    @Arg('postId', () => ID) postId: string,
    @Ctx() { em, userId }: Context
  ) {
    const user = await em.findOne(User, userId)
    const post = await em.findOne(Post, postId, ['planet.moderators'])
    if (!post.planet.moderators.contains(user))
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
    @Ctx() { em, userId }: Context
  ) {
    const user = await em.findOne(User, userId)
    const comment = await em.findOne(Comment, commentId, [
      'post.planet.moderators'
    ])
    if (!comment.post.planet.moderators.contains(user))
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
  async banUserFromPlanet(
    @Arg('planetId', () => ID) planetId: string,
    @Arg('bannedId', () => ID) bannedId: string,
    @Ctx() { em, userId }: Context
  ) {
    const user = await em.findOne(User, userId)
    const planet = await em.findOne(Planet, planetId, ['moderators'])
    if (!planet.moderators.contains(user))
      throw new Error('You are not a moderator')

    const bannedUser = await em.findOne(User, bannedId)
    planet.bannedUsers.add(bannedUser)
    planet.users.remove(bannedUser)
    await em.persistAndFlush(planet)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unbanUserFromPlanet(
    @Arg('planetId', () => ID) planetId: string,
    @Arg('bannedId', () => ID) bannedId: string,
    @Ctx() { em, userId }: Context
  ) {
    const user = await em.findOne(User, userId)
    const planet = await em.findOne(Planet, planetId, ['moderators'])
    if (!planet.moderators.contains(user))
      throw new Error('You are not a moderator')

    const bannedUser = await em.findOne(User, bannedId)
    planet.bannedUsers.remove(bannedUser)
    await em.persistAndFlush(planet)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async uploadPlanetAvatar(
    @Arg('planetId', () => ID) planetId: string,
    @Arg('file', () => GraphQLUpload) file: FileUpload,
    @Ctx() { em, userId }: Context
  ) {
    const user = await em.findOne(User, userId)
    const planet = await em.findOne(Planet, planetId, ['moderators'])
    if (!planet.moderators.contains(user))
      throw new Error('You are not a moderator')

    const { createReadStream, mimetype } = await file
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')
    const avatarUrl = await uploadImage(createReadStream(), file.mimetype, {
      width: 256,
      height: 256
    })
    planet.avatarUrl = avatarUrl
    await em.persistAndFlush(planet)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async uploadPlanetBanner(
    @Arg('planetId', () => ID) planetId: string,
    @Arg('file', () => GraphQLUpload) file: FileUpload,
    @Ctx() { em, userId }: Context
  ) {
    const user = await em.findOne(User, userId)
    const planet = await em.findOne(Planet, planetId, ['moderators'])
    if (!planet.moderators.contains(user))
      throw new Error('You are not a moderator')

    const { createReadStream, mimetype } = await file
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')
    const bannerUrl = await uploadImage(createReadStream(), file.mimetype, {
      width: 1920
    })
    planet.bannerUrl = bannerUrl
    await em.persistAndFlush(planet)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async addModerator(
    @Arg('planetId', () => ID) planetId: string,
    @Arg('username') username: string,
    @Ctx() { em, userId }: Context
  ) {
    const user = await em.findOne(User, userId)
    const planet = await em.findOne(Planet, planetId, ['moderators'])
    if (!planet.moderators.contains(user))
      throw new Error('You are not a moderator')

    const addedUser = await em.findOne(User, {
      username: { $ilike: handleUnderscore(username) }
    })
    if (!addedUser) throw new Error('User not found')
    if (
      planet.moderators
        .getItems()
        .map(m => m.id)
        .find(id => id === addedUser.id)
    )
      throw new Error(`${addedUser.username} is already a moderator`)
    planet.moderators.add(addedUser)
    await em.persistAndFlush(planet)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async editPlanetDescription(
    @Arg('planetId', () => ID) planetId: string,
    @Arg('description') description: string,
    @Ctx() { em, userId }: Context
  ) {
    const user = await em.findOne(User, userId)
    const planet = await em.findOne(Planet, planetId, ['moderators'])
    if (!planet.moderators.contains(user))
      throw new Error('You are not a moderator')

    if (description.length > 1000)
      throw new Error('Description cannot be longer than 1000 characters')

    planet.description = description
    await em.persistAndFlush(planet)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async setPlanetGalaxy(
    @Arg('planetId', () => ID) planetId: string,
    @Arg('galaxy', () => Galaxy) galaxy: Galaxy,
    @Ctx() { em }: Context
  ) {
    await em
      .createQueryBuilder(Planet)
      .update({ galaxy })
      .where({ id: planetId })
      .execute()
    return true
  }
}
