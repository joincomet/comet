import {
  Arg,
  Args,
  Ctx,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from 'type-graphql'
import { Context } from '../Context'
import { User } from '../entities/User'
import { RequiresAuth } from '../middleware/RequiresAuth'
import { Comment } from '../entities/Comment'
import { CommentSort, UserCommentsArgs } from '../args/UserCommentsArgs'
import { RepositoryInjector } from '../RepositoryInjector'
import { Time } from '../args/FeedArgs'
import { discordSendFeedback } from '../DiscordBot'
import { Stream } from 'stream'
import { s3upload } from '../S3Storage'
import { FileUpload, GraphQLUpload } from 'graphql-upload'

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
      .leftJoinAndSelect('user.moderatedPlanets', 'planet')
      .addSelect('COUNT(posts.id)', 'planet_total')
      .leftJoin(
        'planet.posts',
        'posts',
        "posts.deleted = false AND posts.createdAt > NOW() - INTERVAL '1 day'"
      )
      .addGroupBy('user.id')
      .addGroupBy('planet.name')
      .getOne()

    if (!user) return null

    const lastLogin = new Date()
    user.lastLogin = lastLogin
    let ipAddresses = user.ipAddresses
    ipAddresses.unshift(req.ip)
    ipAddresses = [...new Set(ipAddresses)]
    this.userRepository.update(user.id, { lastLogin, ipAddresses })

    user.moderatedPlanets = (await user.moderatedPlanets).filter(
      (p) => !!p.name
    )

    for (const planet of user.moderatedPlanets) {
      planet.postCount = planet.total
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
        case Time.HOUR:
          qb.andWhere("comment.createdAt > NOW() - INTERVAL '1 hour'")
          break
        case Time.DAY:
          qb.andWhere("comment.createdAt > NOW() - INTERVAL '1 day'")
          break
        case Time.WEEK:
          qb.andWhere("comment.createdAt > NOW() - INTERVAL '1 week'")
          break
        case Time.MONTH:
          qb.andWhere("comment.createdAt > NOW() - INTERVAL '1 month'")
          break
        case Time.YEAR:
          qb.andWhere("comment.createdAt > NOW() - INTERVAL '1 year'")
          break
        case Time.ALL:
          break
        default:
          break
      }
      qb.addOrderBy('comment.endorsementCount', 'DESC')
    }
    qb.addOrderBy('comment.createdAt', 'DESC')

    if (userId) {
      qb.loadRelationCountAndMap(
        'comment.personalEndorsementCount',
        'comment.endorsements',
        'endorsement',
        (qb) => {
          return qb
            .andWhere('endorsement.active = true')
            .andWhere('endorsement.userId = :userId', { userId })
        }
      )
    }

    const comments = await qb.getMany()

    comments.forEach(
      (comment) =>
        (comment.isEndorsed = Boolean(comment.personalEndorsementCount))
    )

    return comments
  }

  @UseMiddleware(RequiresAuth)
  @Mutation(() => Boolean)
  async setProfilePic(
    @Ctx() { userId }: Context,
    @Arg('profilePicUrl') profilePicUrl: string,
    @Arg('image', () => GraphQLUpload, { nullable: true }) image?: FileUpload
  ) {
    if (image) {
      const { createReadStream, mimetype } = await image

      if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
        throw new Error('Image must be PNG or JPEG')

      const outStream = new Stream.PassThrough()
      createReadStream().pipe(outStream)

      profilePicUrl = await s3upload(
        `profile/${userId}.png`,
        outStream,
        mimetype,
        true
      )
    }

    if (
      !(
        profilePicUrl.startsWith('https://i.getcomet.net/profile') ||
        profilePicUrl.startsWith('https://api.getcomet.net/avataaar')
      )
    ) {
      throw new Error('Invalid URL')
    }
    await this.userRepository.update(userId, { profilePicUrl })
    return true
  }

  @UseMiddleware(RequiresAuth)
  @Mutation(() => Boolean)
  async setBio(@Arg('bio') bio: string, @Ctx() { userId }: Context) {
    if (bio.length > 160) throw new Error('Bio must be 160 characters or less')
    await this.userRepository.update(userId, { bio })
    return true
  }

  @UseMiddleware(RequiresAuth)
  @Mutation(() => Boolean)
  async setAppearOffline(
    @Arg('appearOffline') appearOffline: boolean,
    @Ctx() { userId }: Context
  ) {
    await this.userRepository.update(userId, { appearOffline })
    return true
  }

  @Mutation(() => Boolean)
  @UseMiddleware(RequiresAuth)
  async uploadProfilePic(
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

    await this.userRepository.update(userId, { profilePicUrl: url })
    return true
  }

  @Mutation(() => Boolean)
  @UseMiddleware(RequiresAuth)
  async uploadBannerImage(
    @Arg('file', () => GraphQLUpload) file: FileUpload,
    @Ctx() { userId }: Context
  ) {
    const { createReadStream, mimetype } = await file

    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')

    const outStream = new Stream.PassThrough()
    createReadStream().pipe(outStream)

    const url = await s3upload(
      `user/${userId}/banner.png`,
      outStream,
      file.mimetype
    )

    await this.userRepository.update(userId, { bannerImageUrl: url })
    return true
  }

  @UseMiddleware(RequiresAuth)
  @Mutation(() => Boolean)
  async followUser(
    @Arg('followedId', () => ID) followedId: string,
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

  @UseMiddleware(RequiresAuth)
  @Mutation(() => Boolean)
  async unfollowUser(
    @Arg('followedId', () => ID) followedId: string,
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

  @UseMiddleware(RequiresAuth)
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

  @UseMiddleware(RequiresAuth)
  @Mutation(() => Boolean)
  async unblockUser(
    @Arg('blockedId', () => ID) blockedId: string,
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

  @Mutation(() => Boolean)
  async sendFeedback(
    @Arg('feedback') feedback: string,
    @Ctx() { userId }: Context
  ) {
    let username = 'Anonymous'
    if (userId) {
      const user = await this.userRepository.findOne(userId)
      username = user.username
    }
    await discordSendFeedback(feedback, username)
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

  @FieldResolver(() => Date, { nullable: true })
  async lastLogin(@Root() user: User) {
    if (user.appearOffline) return null
    return user.lastLogin
  }
}
