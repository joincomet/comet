import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { Context } from '@/types'
import { User, Server } from '@/entity'
import { uploadImage } from '@/util/s3'
import { FileUpload, GraphQLUpload } from 'graphql-upload'

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async getCurrentUser(@Ctx() { user, em }: Context) {
    if (!user) {
      return null
    }
    user.lastLogin = new Date()
    await em.persistAndFlush(user)

    return user
  }

  @Authorized()
  @Query(() => [User])
  async getServerUsers(
    @Ctx() { user, em }: Context,
    @Arg('serverId', () => ID) serverId: string
  ) {
    const server = await em.findOne(Server, serverId, ['users'])
    if (!server) throw new Error('Server not found')
    return server.users
  }

  @Authorized()
  @Mutation(() => String)
  async uploadAvatar(
    @Arg('file', () => GraphQLUpload) file: FileUpload,
    @Ctx() { user, em }: Context
  ) {
    const { createReadStream, mimetype } = await file
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')
    const avatarUrl = await uploadImage(createReadStream(), file.mimetype, {
      width: 256,
      height: 256
    })
    user.avatarUrl = avatarUrl
    await em.persistAndFlush(user)
    return avatarUrl
  }

  @FieldResolver(() => Boolean)
  async isCurrentUser(
    @Root() user: User,
    @Ctx() { user: currentUser }: Context
  ) {
    return currentUser && user.id === currentUser.id
  }
}
