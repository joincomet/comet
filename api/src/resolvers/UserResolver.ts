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
import { User } from '@/entities/User'
import { Comment } from '@/entities/Comment'
import { UserCommentsArgs } from '@/args/UserCommentsArgs'
import { Stream } from 'stream'
import { s3upload } from '@/S3Storage'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { TimeFilter } from '@/types/posts/TimeFilter'
import { CommentSort } from '@/types/CommentSort'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'

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
  async user(@Arg('username') username: string) {
    if (!username) return null

    return this.userRepository
      .createQueryBuilder('user')
      .where('user.username ILIKE :username', {
        username: username.replace(/_/g, '\\_')
      })
      .andWhere('user.banned = false')
      .leftJoinAndSelect('user.moderatedPlanets', 'moderatedPlanet')
      .getOne()
  }

  @Query(() => [Comment])
  async userComments(
    @Args() { username, page, pageSize, sort, time }: UserCommentsArgs,
    @Ctx() { userId }: Context
  ) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username ILIKE :username', {
        username: username.replace(/_/g, '\\_')
      })
      .getOne()

    if (!user) return []

    const qb = this.commentRepository
      .createQueryBuilder('comment')
      .andWhere('comment.authorId = :id', { id: user.id })
      .andWhere('comment.deleted = false')
      .andWhere('comment.removed = false')
    //.skip(page * pageSize)
    //.take(pageSize)

    if (sort === CommentSort.TOP) {
      switch (time) {
        case TimeFilter.HOUR:
          qb.andWhere("comment.createdAt > NOW() - INTERVAL '1 hour'")
          break
        case TimeFilter.DAY:
          qb.andWhere("comment.createdAt > NOW() - INTERVAL '1 day'")
          break
        case TimeFilter.WEEK:
          qb.andWhere("comment.createdAt > NOW() - INTERVAL '1 week'")
          break
        case TimeFilter.MONTH:
          qb.andWhere("comment.createdAt > NOW() - INTERVAL '1 month'")
          break
        case TimeFilter.YEAR:
          qb.andWhere("comment.createdAt > NOW() - INTERVAL '1 year'")
          break
        case TimeFilter.ALL:
          break
        default:
          break
      }
      qb.addOrderBy('comment.rocketCount', 'DESC')
    }
    qb.addOrderBy('comment.createdAt', 'DESC')

    return qb.getMany()
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

    const url = await s3upload(
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
