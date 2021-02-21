import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { Context } from '@/Context'
import { User } from '@/user/User.entity'
import { uploadImage } from '@/S3Storage'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { UserStatus } from '@/user/UserStatus'
import { StatusDuration } from '@/user/StatusDuration'

@Resolver(() => User)
export class UserResolver {
  @Query(() => Boolean)
  async isLoggedIn(@Ctx() { userId, em }: Context) {
    if (!userId) return false
    const user = await em.findOne(User, userId)
    return !(!user || user.banned)
  }

  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() { userId, em }: Context) {
    if (!userId) {
      return null
    }
    const user = await em.findOne(User, userId, [
      'planets.channels',
      'planets.folders',
      'planets.moderators',
      'folders',
      'groups.users',
      'groups.channel'
    ])
    user.lastLogin = new Date()
    await em.persistAndFlush(user)

    const planets = user.planets
      .getItems()
      .sort(
        (a, b) =>
          user.planetsSort.indexOf(a.id) - user.planetsSort.indexOf(b.id)
      )
    planets.forEach(planet => {
      const channels = planet.channels.getItems()
      planet.channels.set(
        channels.sort(
          (a, b) =>
            planet.channelsSort.indexOf(a.id) -
            planet.channelsSort.indexOf(b.id)
        )
      )

      const folders = planet.folders.getItems()
      planet.folders.set(
        folders.sort(
          (a, b) =>
            planet.foldersSort.indexOf(a.id) - planet.foldersSort.indexOf(b.id)
        )
      )
    })

    user.planets.set(planets)

    const folders = user.folders.getItems()
    user.folders.set(
      folders.sort(
        (a, b) =>
          user.foldersSort.indexOf(a.id) - user.foldersSort.indexOf(b.id)
      )
    )

    return user
  }

  @Mutation(() => String)
  @Authorized()
  async uploadAvatar(
    @Arg('file', () => GraphQLUpload) file: FileUpload,
    @Ctx() { userId, em }: Context
  ) {
    const { createReadStream, mimetype } = await file
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')
    const avatarUrl = await uploadImage(createReadStream(), file.mimetype, {
      width: 256,
      height: 256
    })
    const user = await em.findOne(User, userId)
    user.avatarUrl = avatarUrl
    await em.persistAndFlush(user)
    return avatarUrl
  }

  @Mutation(() => Boolean)
  @Authorized()
  async setStatus(
    @Ctx() { userId, em }: Context,
    @Arg('duration', () => StatusDuration, { defaultValue: StatusDuration.DAY })
    duration: StatusDuration = StatusDuration.DAY,
    @Arg('status', { nullable: true }) status?: string,
    @Arg('emoji', { nullable: true }) emoji?: string
  ) {
    const user = await em.findOne(User, userId)
    status = status.trim()
    if (!status) user.status = null
    else {
      if (status.length > 130)
        throw new Error('Bio cannot be longer than 130 characters')
      user.status = new UserStatus(duration, status, emoji)
    }
    await em.persistAndFlush(user)
    return true
  }

  @FieldResolver(() => Boolean)
  async isCurrentUser(@Root() user: User, @Ctx() { userId }: Context) {
    return user.id === userId
  }
}
