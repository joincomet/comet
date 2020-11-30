import {
  Arg,
  Args,
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
import { TimeFilter } from '@/TimeFilter'
import { CommentSort } from '@/comment/CommentSort'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'
import { getUser } from '@/auth/AuthTokens'

@Resolver(() => User)
export class UserResolver {
  @InjectRepository(User)
  readonly userRepository: Repository<User>
  @InjectRepository(Comment)
  readonly commentRepository: Repository<Comment>

  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() { userId }: Context) {
    if (!userId) {
      return null
    }

    return this.userRepository
      .createQueryBuilder('user')
      .whereInIds(userId)
      .getOne()
  }

  @Query(() => User, { nullable: true })
  async getUserFromToken(@Arg('accessToken') accessToken: string) {
    if (!accessToken) return null

    const { userId } = getUser(accessToken)

    return (
      this.userRepository
        .createQueryBuilder('user')
        .whereInIds(userId)
        //.andWhere('user.banned = false')
        //.leftJoinAndSelect('user.moderatedPlanets', 'moderatedPlanet')
        .getOne()
    )
  }

  @Query(() => User, { nullable: true })
  async user(@Arg('username') username: string) {
    if (!username) return null

    return (
      this.userRepository
        .createQueryBuilder('user')
        .where('user.username ILIKE :username', {
          username: username.replace(/_/g, '\\_')
        })
        //.andWhere('user.banned = false')
        //.leftJoinAndSelect('user.moderatedPlanets', 'moderatedPlanet')
        .getOne()
    )
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

    const url = await uploadImage(
      `user/${userId}/avatar.png`,
      outStream,
      file.mimetype
    )
    // TODO
    // await this.userRepository.update(userId, { avatar: url })
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

    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'following')
      .of(userId)
      .add(followedId)

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

    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'following')
      .of(userId)
      .remove(followedId)

    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async blockUser(
    @Arg('blockedUsername') blockedUsername: string,
    @Ctx() { userId }: Context
  ) {
    const blockedUser = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username ILIKE :blockedUsername', {
        blockedUsername: blockedUsername.replace(/_/g, '\\_')
      })
      .getOne()

    if (!blockedUser) throw new Error('User does not exist')

    if (blockedUser.id === userId) {
      throw new Error('Cannot block yourself')
    }

    await this.userRepository
      .createQueryBuilder('user')
      .relation(User, 'blockedUsers')
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

    await this.userRepository
      .createQueryBuilder('user')
      .relation(User, 'blockedUsers')
      .of(userId)
      .remove(blockedId)
    return true
  }

  @FieldResolver(() => Boolean)
  async isCurrentUser(@Root() user: User, @Ctx() { userId }: Context) {
    return user.id === userId
  }
}
