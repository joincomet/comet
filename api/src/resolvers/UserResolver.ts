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
import { RepositoryInjector } from '@/RepositoryInjector'
import { Stream } from 'stream'
import { s3upload } from '@/S3Storage'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { TimeFilter } from '@/types/TimeFilter'
import { CommentSort } from '@/types/CommentSort'

@Resolver(() => User)
export class UserResolver extends RepositoryInjector {
  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() { userId, req }: Context) {
    if (!userId) {
      return null
    }

    const user = await this.userRepository
      .createQueryBuilder('user')
      .whereInIds(userId)
      .andWhere('user.banned = false')
      .leftJoinAndSelect('user.moderatedCommunities', 'community')
      .addSelect('COUNT(posts.id)', 'community_total')
      .leftJoin(
        'community.posts',
        'posts',
        "posts.deleted = false AND posts.createdAt > NOW() - INTERVAL '1 day'"
      )
      .addGroupBy('user.id')
      .addGroupBy('community.name')
      .getOne()

    if (!user) return null

    const lastLogin = new Date()
    user.lastLogin = lastLogin
    this.userRepository.update(user.id, { lastLogin })

    user.moderatedCommunities = (await user.moderatedCommunities).filter(
      (p) => !!p.name
    )

    for (const community of user.moderatedCommunities) {
      community.postCount = community.total
    }

    return user
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
      .loadRelationCountAndMap('user.followerCount', 'user.followers')
      .loadRelationCountAndMap('user.followingCount', 'user.following')
      .loadRelationCountAndMap(
        'user.commentCount',
        'user.comments',
        'comment',
        (qb) => {
          return qb.andWhere('comment.deleted = false')
        }
      )
      .loadRelationCountAndMap('user.postCount', 'user.posts', 'post', (qb) => {
        return qb
          .andWhere('post.deleted = false')
          .andWhere('post.removed = false')
      })
      .leftJoinAndSelect('user.moderatedCommunities', 'moderatedCommunity')
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
      qb.addOrderBy('comment.upvoteCount', 'DESC')
    }
    qb.addOrderBy('comment.createdAt', 'DESC')

    if (userId) {
      qb.loadRelationCountAndMap(
        'comment.personalUpvoteCount',
        'comment.upvotes',
        'upvote',
        (qb) => {
          return qb
            .andWhere('upvote.active = true')
            .andWhere('upvote.userId = :userId', { userId })
        }
      )
    }

    const comments = await qb.getMany()

    comments.forEach(
      (comment) => (comment.upvoted = Boolean(comment.personalUpvoteCount))
    )

    return comments
  }

  @Authorized()
  @Mutation(() => Boolean)
  async setProfilePic(
    @Ctx() { userId }: Context,
    @Arg('image', () => GraphQLUpload, { nullable: true }) image: FileUpload
  ) {
    const { createReadStream, mimetype } = await image
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')

    const outStream = new Stream.PassThrough()
    createReadStream().pipe(outStream)

    const avatarImageUrl = await s3upload(
      `profile/${userId}.png`,
      outStream,
      mimetype
    )

    await this.userRepository.update(userId, { avatarImageUrl })
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async setBio(@Arg('bio') bio: string, @Ctx() { userId }: Context) {
    if (bio.length > 160) throw new Error('Bio must be 160 characters or less')
    await this.userRepository.update(userId, { bio })
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async setAppearOffline(
    @Arg('appearOffline') appearOffline: boolean,
    @Ctx() { userId }: Context
  ) {
    await this.userRepository.update(userId, { appearOffline })
    return true
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
    // await this.userRepository.update(userId, { avatarImageUrl: url })
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
  async isFollowing(@Root() user: User, @Ctx() { userId }: Context) {
    if (!userId) return false

    user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId: userId })
      .leftJoinAndSelect(
        'user.following',
        'targetUser',
        'targetUser.id = :targetId',
        {
          targetId: user.id
        }
      )
      .getOne()

    if (!user) return false

    return Boolean((await user.following).length)
  }

  @FieldResolver(() => Boolean)
  async isFollowed(@Root() user: User, @Ctx() { userId }: Context) {
    if (!userId) return false

    user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId: user.id })
      .leftJoinAndSelect(
        'user.following',
        'targetUser',
        'targetUser.id = :targetId',
        {
          targetId: userId
        }
      )
      .getOne()

    if (!user) return false

    return Boolean((await user.following).length)
  }

  @FieldResolver(() => Boolean)
  async isBlocked(@Root() user: User, @Ctx() { userId }: Context) {
    if (!userId) return false

    user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId: user.id })
      .leftJoinAndSelect(
        'user.blockedUsers',
        'targetUser',
        'targetUser.id = :targetId',
        {
          targetId: userId
        }
      )
      .getOne()

    if (!user) return false

    return Boolean((await user.blockedUsers).length)
  }

  @FieldResolver(() => Boolean)
  async isBlocking(@Root() user: User, @Ctx() { userId }: Context) {
    if (!userId) return false

    user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId: userId })
      .leftJoinAndSelect(
        'user.blockedUsers',
        'targetUser',
        'targetUser.id = :targetId',
        {
          targetId: user.id
        }
      )
      .getOne()

    if (!user) return false

    return Boolean((await user.blockedUsers).length)
  }

  @FieldResolver(() => Boolean)
  async isCurrentUser(@Root() user: User, @Ctx() { userId }: Context) {
    return user.id === userId
  }
}
