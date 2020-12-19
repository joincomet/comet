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
import { Context } from '@/Context'
import { User } from '@/user/User.Entity'
import { Comment } from '@/comment/Comment.Entity'
import { Stream } from 'stream'
import { uploadImage } from '@/S3Storage'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'
import { handleUnderscore } from '@/handleUnderscore'

@Resolver(() => User)
export class UserResolver {
  @InjectRepository(User)
  readonly userRepo: Repository<User>
  @InjectRepository(Comment)
  readonly commentRepo: Repository<Comment>

  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() { userId }: Context) {
    if (!userId) {
      return null
    }

    return this.userRepo.createQueryBuilder('user').whereInIds(userId).getOne()
  }

  @Query(() => User, { nullable: true })
  async user(@Arg('username') username: string) {
    if (!username) return null

    return this.userRepo
      .createQueryBuilder('user')
      .where('user.username ILIKE :username', {
        username: handleUnderscore(username)
      })
      .leftJoinAndSelect('user.moderatedPlanets', 'moderatedPlanet')
      .getOne()
  }

  @Mutation(() => Boolean)
  @Authorized()
  async uploadAvatar(
    @Arg('file', () => GraphQLUpload) file: FileUpload,
    @Ctx() { userId }: Context
  ) {
    const { createReadStream, mimetype } = await file

    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')

    const outStream = new Stream.PassThrough()
    createReadStream().pipe(outStream)

    const avatarUrl = await uploadImage(outStream, file.mimetype)
    await this.userRepo.update(userId, { avatarUrl })
    return true
  }

  @Mutation(() => Boolean)
  @Authorized()
  async uploadBanner(
    @Arg('file', () => GraphQLUpload) file: FileUpload,
    @Ctx() { userId }: Context
  ) {
    const { createReadStream, mimetype } = await file

    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')

    const outStream = new Stream.PassThrough()
    createReadStream().pipe(outStream)

    const bannerUrl = await uploadImage(outStream, file.mimetype)
    await this.userRepo.update(userId, { bannerUrl })
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async followUser(
    @Arg('followedId', () => ID) followedId: number,
    @Ctx() { userId }: Context
  ) {
    if (followedId === userId) {
      throw new Error('Cannot follow yourself')
    }

    await this.userRepo
      .createQueryBuilder()
      .relation(User, 'following')
      .of(userId)
      .add(followedId)

    await this.userRepo.increment({ id: userId }, 'followingCount', 1)
    await this.userRepo.increment({ id: followedId }, 'followerCount', 1)

    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unfollowUser(
    @Arg('followedId', () => ID) followedId: number,
    @Ctx() { userId }: Context
  ) {
    if (followedId === userId) {
      throw new Error('Cannot unfollow yourself')
    }

    await this.userRepo
      .createQueryBuilder()
      .relation(User, 'following')
      .of(userId)
      .remove(followedId)

    await this.userRepo.decrement({ id: userId }, 'followingCount', 1)
    await this.userRepo.decrement({ id: followedId }, 'followerCount', 1)

    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async blockUser(
    @Arg('blockedUsername') blockedUsername: string,
    @Ctx() { userId }: Context
  ) {
    const blockedUser = await this.userRepo
      .createQueryBuilder('user')
      .where('user.username ILIKE :blockedUsername', {
        blockedUsername: handleUnderscore(blockedUsername)
      })
      .getOne()

    if (!blockedUser) throw new Error('User does not exist')

    if (blockedUser.id === userId) {
      throw new Error('Cannot block yourself')
    }

    await this.userRepo
      .createQueryBuilder('user')
      .relation(User, 'blockTo')
      .of(userId)
      .add(blockedUser.id)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unblockUser(
    @Arg('blockedId', () => ID) blockedId: number,
    @Ctx() { userId }: Context
  ) {
    if (blockedId === userId) {
      throw new Error('Cannot unblock yourself')
    }

    await this.userRepo
      .createQueryBuilder('user')
      .relation(User, 'blockTo')
      .of(userId)
      .remove(blockedId)
    return true
  }

  @FieldResolver(() => Boolean)
  async isCurrentUser(@Root() user: User, @Ctx() { userId }: Context) {
    return user.id === userId
  }

  @FieldResolver(() => Boolean)
  async isFollowing(
    @Root() user: User,
    @Ctx() { userId, followingLoader }: Context
  ) {
    if (!userId) return false
    return followingLoader.load({ userId, followingId: user.id })
  }

  @FieldResolver(() => Boolean)
  async isFollowed(
    @Root() user: User,
    @Ctx() { userId, followedLoader }: Context
  ) {
    if (!userId) return false
    return followedLoader.load({ userId, followedId: user.id })
  }
}
