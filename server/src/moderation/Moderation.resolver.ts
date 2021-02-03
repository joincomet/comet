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
  @Authorized('MOD')
  @Mutation(() => Boolean)
  async removePost(
    @Arg('postId', () => ID) postId: bigint,
    @Arg('reason') reason: string,
    @Arg('planetId', () => ID) planetId: string,
    @Ctx() { em }: Context
  ) {
    await em.persistAndFlush(
      em.assign(await em.findOne(Post, postId), {
        removed: true,
        removedReason: reason,
        pinned: false,
        pinRank: null
      })
    )
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async pinPost(
    @Arg('planetId', () => ID) planetId: bigint,
    @Arg('postId', () => ID) postId: bigint,
    @Ctx() { em }: Context
  ) {
    await em.persistAndFlush(
      em.assign(await em.findOne(Post, postId), {
        pinned: true
      })
    )
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async unpinPost(
    @Arg('planetId', () => ID) planetId: bigint,
    @Arg('postId', () => ID) postId: bigint,
    @Ctx() { em }: Context
  ) {
    await em.persistAndFlush(
      em.assign(await em.findOne(Post, postId), {
        pinned: false,
        pinRank: null
      })
    )
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async removeComment(
    @Arg('planetId', () => ID) planetId: bigint,
    @Arg('commentId', () => ID) commentId: bigint,
    @Arg('reason') reason: string,
    @Ctx() { em }: Context
  ) {
    const comment = em.assign(await em.findOne(Comment, commentId, ['post']), {
      removed: true,
      removedReason: reason,
      pinned: false,
      pinRank: null
    })
    await em.nativeDelete(Notification, { comment })
    const post = await em.findOne(Post, comment.post.id)
    post.commentCount--
    await em.persistAndFlush([comment, post])
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async banUserFromPlanet(
    @Arg('planetId', () => ID) planetId: bigint,
    @Arg('bannedId', () => ID) bannedId: bigint,
    @Ctx() { em }: Context
  ) {
    const bannedUser = await em.findOne(User, bannedId)
    const planet = await em.findOne(Planet, planetId)
    planet.bannedUsers.add(bannedUser)
    planet.users.remove(bannedUser)
    await em.persistAndFlush(planet)
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async unbanUserFromPlanet(
    @Arg('planetId', () => ID) planetId: bigint,
    @Arg('bannedId', () => ID) bannedId: bigint,
    @Ctx() { em }: Context
  ) {
    const bannedUser = await em.findOne(User, bannedId)
    const planet = await em.findOne(Planet, planetId)
    planet.bannedUsers.remove(bannedUser)
    await em.persistAndFlush(planet)
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async uploadPlanetAvatar(
    @Arg('planetId', () => ID) planetId: bigint,
    @Arg('file', () => GraphQLUpload) file: FileUpload,
    @Ctx() { em }: Context
  ) {
    const { createReadStream, mimetype } = await file
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')
    const avatarUrl = await uploadImage(createReadStream(), file.mimetype, {
      width: 256,
      height: 256
    })
    await em
      .createQueryBuilder(Planet)
      .update({ avatarUrl })
      .where({ id: planetId })
      .execute()
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async uploadPlanetBanner(
    @Arg('planetId', () => ID) planetId: bigint,
    @Arg('file', () => GraphQLUpload) file: FileUpload,
    @Ctx() { em }: Context
  ) {
    const { createReadStream, mimetype } = await file
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')
    const bannerUrl = await uploadImage(createReadStream(), file.mimetype, {
      width: 1920
    })
    await em
      .createQueryBuilder(Planet)
      .update({ bannerUrl })
      .where({ id: planetId })
      .execute()
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async addModerator(
    @Arg('planetId', () => ID) planetId: bigint,
    @Arg('username') username: string,
    @Ctx() { em }: Context
  ) {
    const user = await em.findOne(
      User,
      { username: { $ilike: handleUnderscore(username) } },
      ['moderatedPlanets']
    )
    if (!user) throw new Error('User not found')
    if (
      user.moderatedPlanets
        .getItems()
        .map(p => p.id)
        .find(id => id === planetId)
    )
      throw new Error(`${user.username} is already a moderator`)
    if (user.moderatedPlanets.length >= 10)
      throw new Error(`${user.username} cannot moderate more than 10 planets`)
    const planet = await em.findOne(Planet, planetId)
    planet.moderators.add(user)
    await em.persistAndFlush(planet)
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async editPlanetDescription(
    @Arg('planetId', () => ID) planetId: bigint,
    @Arg('description') description: string,
    @Ctx() { em }: Context
  ) {
    if (description.length > 1000)
      throw new Error('Description cannot be longer than 1000 characters')

    await em
      .createQueryBuilder(Planet)
      .update({ description })
      .where({ id: planetId })
      .execute()
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async setPlanetGalaxy(
    @Arg('planetId', () => ID) planetId: bigint,
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
