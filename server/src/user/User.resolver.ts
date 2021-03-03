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
    const user = await em.findOne(User, userId)
    user.lastLogin = new Date()
    await em.persistAndFlush(user)

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

  @FieldResolver(() => Boolean)
  async isCurrentUser(@Root() user: User, @Ctx() { userId }: Context) {
    return user.id === userId
  }
}
