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
import { handleUnderscore } from '@/handleUnderscore'

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() { userId, em }: Context) {
    if (!userId) {
      return null
    }
    const user = await em.findOne(User, userId, ['planets'])
    user.lastLogin = new Date()
    await em.persistAndFlush(user)
    return user
  }

  @Query(() => User, { nullable: true })
  async user(@Arg('username') username: string, @Ctx() { em }: Context) {
    if (!username) return null
    return em.findOne(User, {
      username: { $ilike: handleUnderscore(username) }
    })
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

  @Mutation(() => String)
  @Authorized()
  async uploadBanner(
    @Arg('file', () => GraphQLUpload) file: FileUpload,
    @Ctx() { userId, em }: Context
  ) {
    const { createReadStream, mimetype } = await file
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')
    const bannerUrl = await uploadImage(createReadStream(), file.mimetype, {
      width: 1920
    })
    const user = await em.findOne(User, userId)
    user.bannerUrl = bannerUrl
    await em.persistAndFlush(user)
    return bannerUrl
  }

  @Mutation(() => Boolean)
  @Authorized()
  async editBio(@Arg('bio') bio: string, @Ctx() { userId, em }: Context) {
    bio = bio.trim()
    if (!bio) throw new Error('Bio cannot be empty')
    if (bio.length > 300)
      throw new Error('Bio cannot be longer than 300 characters')
    const user = await em.findOne(User, userId)
    user.bio = bio
    await em.persistAndFlush(user)
    return true
  }

  @FieldResolver(() => Boolean)
  async isCurrentUser(@Root() user: User, @Ctx() { userId }: Context) {
    return user.id === userId
  }
}
