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
import { Post } from '@/entities/Post'
import { SubmitPostArgs } from '@/args/SubmitPostArgs'
import { Context } from '@/Context'
import { getTitleAtUrl } from '@/iFramely'
import { FeedArgs } from '@/args/FeedArgs'
import { User } from '@/entities/User'
import { discordReport } from '@/DiscordBot'
import { filterXSS } from 'xss'
import { whiteList } from '@/XSSWhiteList'
import { PostUpvote } from '@/entities/PostUpvote'
import { Stream } from 'stream'
import { s3upload } from '@/S3Storage'
import { TimeFilter } from '@/types/TimeFilter'
import { PostSort } from '@/types/PostSort'
import { Feed } from '@/types/Feed'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'
import { Comment } from '@/entities/Comment'
import { Notification } from '@/entities/Notification'
import { Community } from '@/entities/Community'

@Resolver(() => Post)
export class PostResolver {
  @InjectRepository(User)
  readonly userRepository: Repository<User>
  @InjectRepository(Post)
  readonly postRepository: Repository<Post>
  @InjectRepository(PostUpvote)
  readonly postUpvoteRepository: Repository<PostUpvote>
  @InjectRepository(Comment)
  readonly commentRepository: Repository<Comment>
  @InjectRepository(Notification)
  readonly notificationRepository: Repository<Notification>
  @InjectRepository(Community)
  readonly communityRepository: Repository<Community>

  @Query(() => String, { nullable: true })
  async getTitleAtUrl(@Arg('url') url: string) {
    return getTitleAtUrl(url)
  }

  @Query(() => [Post])
  async feed(
    @Args()
    {
      page,
      pageSize,
      sort,
      time,
      feed,
      community,
      tags,
      username,
      search
    }: FeedArgs,
    @Ctx() { userId }: Context
  ) {
    const qb = this.postRepository
      .createQueryBuilder('post')
      .andWhere('post.deleted = false')
      .andWhere('post.removed = false')
      .leftJoinAndSelect('post.community', 'community')
      .leftJoinAndSelect('community.tags', 'tag')

    if (community) {
      qb.andWhere(':community ILIKE post.community', {
        community
      }).andWhere('post.sticky = false')
    }

    if (tags && tags.length > 0) {
      // TODO Tag filters
      // qb.andWhere(':galaxyName ILIKE galaxy.name', { galaxyName })
    }

    if (search) {
      qb.addSelect(
        'ts_rank_cd(to_tsvector(post.textContent), plainto_tsquery(:query))',
        'textrank'
      )
        .addSelect(
          'ts_rank_cd(to_tsvector(post.link), plainto_tsquery(:query))',
          'linkrank'
        )
        .addSelect(
          'ts_rank_cd(to_tsvector(post.title), plainto_tsquery(:query))',
          'titlerank'
        )
        .leftJoinAndSelect('post.author', 'author')
        .addSelect(
          'ts_rank_cd(to_tsvector(author.username), plainto_tsquery(:query))',
          'usernamerank'
        )
        .addOrderBy('titlerank', 'DESC')
        .addOrderBy('textrank', 'DESC')
        .addOrderBy('linkrank', 'DESC')
        .addOrderBy('usernamerank', 'DESC')
        .setParameter('query', search)
    }

    if (username) {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.username ILIKE :username', {
          username: username.replace(/_/g, '\\_')
        })
        .getOne()

      if (!user) return []

      qb.andWhere('post.authorId = :id', { id: user.id })
    }

    /*if (types.length === 1 || types.length === 2) {
      qb.andWhere('post.type = ANY(:types)', {
        types: types.map((type) => type.toUpperCase())
      })
    }*/

    if (sort === PostSort.NEW) {
      qb.addOrderBy('post.createdAt', 'DESC')
    } else if (sort === PostSort.HOT) {
      qb.addSelect(
        '(CAST(post.upvoteCount AS float) + 1)/((CAST((CAST(EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) AS int) - CAST(EXTRACT(EPOCH FROM post.createdAt) AS int)+5000) AS FLOAT)/100.0)^(1.6))',
        'post_hotrank'
      )
      qb.addOrderBy('post_hotrank', 'DESC')
    } else if (sort === PostSort.TOP || sort === PostSort.COMMENTS) {
      switch (time) {
        case TimeFilter.HOUR:
          qb.andWhere("post.createdAt > NOW() - INTERVAL '1 hour'")
          break
        case TimeFilter.DAY:
          qb.andWhere("post.createdAt > NOW() - INTERVAL '1 day'")
          break
        case TimeFilter.WEEK:
          qb.andWhere("post.createdAt > NOW() - INTERVAL '1 week'")
          break
        case TimeFilter.MONTH:
          qb.andWhere("post.createdAt > NOW() - INTERVAL '1 month'")
          break
        case TimeFilter.YEAR:
          qb.andWhere("post.createdAt > NOW() - INTERVAL '1 year'")
          break
        case TimeFilter.ALL:
          break
        default:
          break
      }
      if (sort === PostSort.TOP) {
        qb.addOrderBy('post.upvoteCount', 'DESC')
      } else if (sort === PostSort.COMMENTS) {
        qb.addOrderBy('post.commentCount', 'DESC')
      }
      qb.addOrderBy('post.createdAt', 'DESC')
    }

    if (userId) {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .whereInIds(userId)
        .leftJoinAndSelect('user.communities', 'communities')
        .leftJoinAndSelect('user.mutedCommunities', 'mutedCommunity')
        .leftJoinAndSelect('user.blockedUsers', 'blockedUser')
        .leftJoinAndSelect('user.hiddenPosts', 'hiddenPost')
        .getOne()

      if (user) {
        const mutedCommunities = (await user.mutedCommunities).map(
          community => community.name
        )
        const blockedUsers = (await user.blockedUsers).map(user => user.id)
        const hiddenPosts = (await user.hiddenPosts).map(post => post.id)

        if (!community && feed === Feed.JOINED) {
          const communities = (await user.communities).map(
            community => community.name
          )
          qb.andWhere('post.community = ANY(:communities)', { communities })
        }

        if (mutedCommunities.length > 0) {
          qb.andWhere('NOT (post.community = ANY(:mutedCommunities))', {
            mutedCommunities
          })
        }

        qb.andWhere('NOT (post.authorId = ANY(:blockedUsers))', {
          blockedUsers
        })

        qb.andWhere('NOT (post.id  = ANY(:hiddenPosts))', { hiddenPosts })

        qb.loadRelationCountAndMap(
          'post.personalUpvoteCount',
          'post.upvotes',
          'upvote',
          qb => {
            return qb
              .andWhere('upvote.active = true')
              .andWhere('upvote.userId = :userId', { userId })
          }
        )

        qb.loadRelationCountAndMap(
          'community.personalUserCount',
          'community.users',
          'user',
          qb => {
            return qb.andWhere('user.id  = :userId', { userId })
          }
        )
      }
    }

    let posts = await qb
      .skip(page * pageSize)
      .take(pageSize)
      .loadRelationCountAndMap('community.userCount', 'community.users')
      .getMany()

    if (community && page === 0) {
      const stickiesQb = await this.postRepository
        .createQueryBuilder('post')
        .andWhere('post.sticky = true')
        .andWhere('post.community = :community', {
          community
        })
        .leftJoinAndSelect('post.community', 'community')
        .leftJoinAndSelect('community.tags', 'tag')
        .loadRelationCountAndMap('community.userCount', 'community.users')
        .addOrderBy('post.createdAt', 'DESC')

      if (userId) {
        stickiesQb.loadRelationCountAndMap(
          'post.personalUpvoteCount',
          'post.upvotes',
          'upvote',
          qb => {
            return qb
              .andWhere('upvote.active = true')
              .andWhere('upvote.userId = :userId', { userId })
          }
        )

        stickiesQb.loadRelationCountAndMap(
          'community.personalUserCount',
          'community.users',
          'user',
          qb => {
            return qb.andWhere('user.id  = :userId', { userId })
          }
        )
      }

      const stickies = await stickiesQb.getMany()

      posts = stickies.concat(posts)
    }

    for (const p of posts) {
      p.upvoted = Boolean(p.personalUpvoteCount)
      ;(await p.community).joined = Boolean(
        (await p.community).personalUserCount
      )
      p.hidden = false
    }

    return posts
  }

  @Query(() => [Post])
  async hiddenPosts(@Ctx() { userId }: Context) {
    if (!userId) return []

    let posts = await this.userRepository
      .createQueryBuilder()
      .relation(User, 'hiddenPosts')
      .of(userId)
      .loadMany()

    if (posts.length === 0) return []

    const qb = this.postRepository
      .createQueryBuilder('post')
      .whereInIds(posts.map(post => post.id))

    qb.loadRelationCountAndMap(
      'post.personalUpvoteCount',
      'post.upvotes',
      'upvote',
      qb => {
        return qb
          .andWhere('upvote.active = true')
          .andWhere('upvote.userId = :userId', { userId })
      }
    )

    posts = await qb.leftJoinAndSelect('post.community', 'community').getMany()

    posts.forEach(post => {
      post.upvoted = Boolean(post.personalUpvoteCount)
      post.hidden = true
    })

    return posts
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg('postId', () => ID) postId: any, @Ctx() { userId }: Context) {
    if (!postId) return null

    postId = parseInt(postId, 36)

    const qb = this.postRepository
      .createQueryBuilder('post')
      .where('post.id  = :postId', { postId })
      .leftJoinAndSelect('post.community', 'community')
      .loadRelationCountAndMap('community.userCount', 'community.users')
      .leftJoinAndSelect('community.tags', 'tag')

    if (userId) {
      qb.loadRelationCountAndMap(
        'post.personalUpvoteCount',
        'post.upvotes',
        'upvote',
        qb => {
          return qb
            .andWhere('upvote.active = true')
            .andWhere('upvote.userId = :userId', { userId })
        }
      )
      qb.loadRelationCountAndMap(
        'community.personalUserCount',
        'community.users',
        'user',
        qb => {
          return qb.andWhere('user.id  = :userId', { userId })
        }
      )
    }

    const post = await qb.getOne()

    if (!post) return null

    post.upvoted = Boolean(post.personalUpvoteCount)
    ;(await post.community).joined = Boolean(
      (await post.community).personalUserCount
    )

    if (post.deleted) {
      post.authorId = null
      post.author = null
      post.textContent = '<p>[deleted]</p>'
    }

    if (post.removed) {
      post.authorId = null
      post.author = null
      post.textContent = `<p>[removed: ${post.removedReason}]</p>`
    }

    return post
  }

  @Authorized()
  @Mutation(() => Post)
  async submitPost(
    @Args()
    { title, link, textContent, community, image }: SubmitPostArgs,
    @Ctx() { userId }: Context
  ) {
    const cmmnty = await this.communityRepository
      .createQueryBuilder('community')
      .where('community.name = :community', { community })
      .leftJoinAndSelect('community.bannedUsers', 'bannedUser')
      .getOne()
    const bannedUsers = await cmmnty.bannedUsers
    if (bannedUsers.map(u => u.id).includes(userId))
      throw new Error('You have been banned from ' + cmmnty.name)

    if (textContent) {
      textContent = filterXSS(textContent, { whiteList })
    }

    const post = await this.postRepository.save({
      title,
      link,
      textContent,
      createdAt: new Date(),
      authorId: userId,
      communityId: cmmnty.id,
      upvoteCount: 1
    })

    if (image) {
      const { createReadStream, mimetype } = await image

      if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
        throw new Error('Image must be PNG or JPEG')

      const outStream = new Stream.PassThrough()
      createReadStream().pipe(outStream)

      link = await s3upload(`uploads/${post.id}.png`, outStream, mimetype)
    }

    this.postUpvoteRepository.save({
      postId: post.id,
      userId: userId,
      active: true,
      createdAt: new Date()
    } as PostUpvote)

    this.userRepository.increment({ id: userId }, 'upvoteCount', 1)

    return post
  }

  @Authorized('USER')
  @Mutation(() => Boolean)
  async editPost(
    @Arg('postId', () => ID) postId: number,
    @Arg('newTextContent') newTextContent: string,
    @Ctx() { userId }: Context
  ) {
    const post = await this.postRepository.findOne(postId)
    const user = await this.userRepository.findOne(userId)
    if (post.authorId !== userId && !user.admin)
      throw new Error('Attempt to edit post by someone other than author')

    newTextContent = filterXSS(newTextContent, { whiteList })

    await this.postRepository
      .createQueryBuilder()
      .update()
      .set({ editedAt: new Date(), textContent: newTextContent })
      .where('id = :postId', { postId })
      .execute()

    return true
  }

  @Authorized('USER')
  @Mutation(() => Boolean)
  async deletePost(
    @Arg('postId', () => ID) postId: number,
    @Ctx() { userId }: Context
  ) {
    const post = await this.postRepository.findOne(postId)
    const user = await this.userRepository.findOne(userId)
    if (post.authorId !== userId && !user.admin)
      throw new Error('Attempt to delete post by someone other than author')

    await this.postRepository
      .createQueryBuilder()
      .update()
      .set({ deleted: true })
      .where('id = :postId', { postId })
      .execute()

    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async togglePostUpvote(
    @Arg('postId', () => ID) postId: number,
    @Ctx() { userId }: Context
  ) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .whereInIds(postId)
      .leftJoinAndSelect('post.author', 'author')
      .getOne()
    if (!post) throw new Error('Invalid postId')

    let active: boolean

    const upvote = await this.postUpvoteRepository.findOne({
      postId,
      userId
    })
    if (upvote) {
      await this.postUpvoteRepository.update(
        { postId, userId },
        { active: !upvote.active }
      )
      active = !upvote.active
    } else {
      await this.postUpvoteRepository.save({
        postId,
        userId,
        createdAt: new Date(),
        active: true
      })
      active = true
    }

    this.postRepository.update(
      { id: postId },
      {
        upvoteCount: active ? post.upvoteCount + 1 : post.upvoteCount - 1
      }
    )

    const author = await post.author
    this.userRepository.update(
      { id: author.id },
      {
        upvoteCount: active ? author.upvoteCount + 1 : author.upvoteCount - 1
      }
    )

    return active
  }

  @Authorized()
  @Mutation(() => Boolean)
  async hidePost(
    @Arg('postId', () => ID) postId: number,
    @Ctx() { userId }: Context
  ) {
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'hiddenPosts')
      .of(userId)
      .remove(postId)

    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'hiddenPosts')
      .of(userId)
      .add(postId)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unhidePost(
    @Arg('postId', () => ID) postId: number,
    @Ctx() { userId }: Context
  ) {
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'hiddenPosts')
      .of(userId)
      .remove(postId)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async savePost(
    @Arg('postId', () => ID) postId: number,
    @Ctx() { userId }: Context
  ) {
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'savedPosts')
      .of(userId)
      .remove(postId)

    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'savedPosts')
      .of(userId)
      .add(postId)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unsavePost(
    @Arg('postId', () => ID) postId: number,
    @Ctx() { userId }: Context
  ) {
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'savedPosts')
      .of(userId)
      .remove(postId)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async reportPost(
    @Arg('postId', () => ID) postId: number,
    @Ctx() { userId }: Context
  ) {
    const user = await this.userRepository.findOne(userId)

    await discordReport(
      user.username,
      process.env.NODE_ENV === 'production'
        ? `${process.env.ORIGIN_URL}/post/${postId}`
        : `http://localhost:3000/post/${postId}`
    )

    return true
  }

  @FieldResolver()
  async author(@Root() post: Post, @Ctx() { userLoader }: Context) {
    if (!post.authorId) return null
    return userLoader.load(post.authorId)
  }
}
