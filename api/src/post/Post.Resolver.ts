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
import { Post } from '@/post/Post.Entity'
import { SubmitPostArgs } from '@/post/SubmitPostArgs'
import { Context } from '@/Context'
import { PostsArgs } from '@/post/PostsArgs'
import { User } from '@/user/User.Entity'
import { filterXSS } from 'xss'
import { whiteList } from '@/XSSWhiteList'
import { PostRocket } from '@/post/PostRocket.Entity'
import { Stream } from 'stream'
import { uploadImage } from '@/S3Storage'
import { TimeFilter } from '@/TimeFilter'
import { PostSort } from '@/post/PostSort'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'
import { Comment } from '@/comment/Comment.Entity'
import { Notification } from '@/notification/Notification.Entity'
import { Planet } from '@/planet/Planet.Entity'
import { PlanetUser } from '@/planet/PlanetUser.Entity'
import { PostsResponse } from '@/post/PostsResponse'
import { Metadata } from '@/metascraper/Metadata'
import { scrapeMetadata } from '@/metascraper/scrapeMetadata'
import { handleUnderscore } from '@/handleUnderscore'

@Resolver(() => Post)
export class PostResolver {
  @InjectRepository(User)
  readonly userRepo: Repository<User>
  @InjectRepository(Post)
  readonly postRepo: Repository<Post>
  @InjectRepository(PostRocket)
  readonly postRocketRepo: Repository<PostRocket>
  @InjectRepository(Comment)
  readonly commentRepo: Repository<Comment>
  @InjectRepository(Notification)
  readonly notificationRepo: Repository<Notification>
  @InjectRepository(Planet)
  readonly planetRepo: Repository<Planet>
  @InjectRepository(PlanetUser)
  readonly planetUserRepo: Repository<PlanetUser>

  @Query(() => PostsResponse)
  async posts(
    @Args()
    {
      page,
      pageSize,
      sort,
      time,
      universe,
      folderId,
      galaxy,
      planet,
      username,
      search
    }: PostsArgs,
    @Ctx() { userId }: Context
  ) {
    const qb = this.postRepo
      .createQueryBuilder('post')
      .andWhere('post.deleted = false')
      .andWhere('post.removed = false')
      .leftJoinAndSelect('post.planet', 'planet')
      .leftJoinAndSelect('post.author', 'author')

    if (planet) {
      qb.andWhere('planet.name ILIKE :planet', {
        planet: handleUnderscore(planet)
      }).andWhere('post.sticky = false')
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
      qb.andWhere('author.username ILIKE :username', {
        username: handleUnderscore(username)
      })
    }

    if (sort === PostSort.NEW) {
      qb.addOrderBy('post.createdAt', 'DESC')
    } else if (sort === PostSort.HOT) {
      qb.addSelect(
        '(CAST(post.rocketCount AS float) + 1)/((CAST((CAST(EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) AS int) - CAST(EXTRACT(EPOCH FROM post.createdAt) AS int)+5000) AS FLOAT)/100.0)^(1.618))',
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
        qb.addOrderBy('post.rocketCount', 'DESC')
      } else if (sort === PostSort.COMMENTS) {
        qb.addOrderBy('post.commentCount', 'DESC')
      }
      qb.addOrderBy('post.createdAt', 'DESC')
    }

    if (userId) {
      const user = await this.userRepo
        .createQueryBuilder('user')
        .whereInIds(userId)
        .leftJoinAndSelect('user.mutedPlanets', 'mutedPlanet')
        .leftJoinAndSelect('user.blockTo', 'blockedUser')
        .leftJoinAndSelect('user.hiddenPosts', 'hiddenPost')
        .getOne()

      if (user) {
        const mutedPlanets = (await user.mutedPlanets).map(
          planet => (planet.planet as Planet).name
        )
        const blockTo = ((await user.blockTo) || []).map(
          user => (user.to as User).id
        )
        const hiddenPosts = (await user.hiddenPosts).map(
          post => (post.post as Post).id
        )

        if (!universe) {
          const sub = await this.planetUserRepo
            .createQueryBuilder('join')
            .where(`"join"."user_id" = ${userId}`)
            .select('"join"."planet_id"')
          qb.andWhere(`planet.id = ANY((${sub.getQuery()}))`)
        }

        if (mutedPlanets.length > 0) {
          qb.andWhere('NOT (post.planet = ANY(:mutedPlanets))', {
            mutedPlanets
          })
        }

        qb.andWhere('NOT (post.authorId = ANY(:blockTo))', {
          blockTo
        })

        qb.andWhere('NOT (post.id  = ANY(:hiddenPosts))', { hiddenPosts })
      }
    }

    let posts = await qb
      .skip(page * pageSize)
      .take(pageSize)
      .getMany()

    if (page === 0) {
      const stickiesQb = await this.postRepo
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.planet', 'planet')
        .leftJoinAndSelect('post.author', 'author')
        .addOrderBy('post.stickiedAt', 'DESC')

      if (planet) {
        stickiesQb
          .andWhere('planet.name ILIKE :planet', {
            planet: handleUnderscore(planet)
          })
          .andWhere('post.sticky = true')
      } else if (username) {
        stickiesQb
          .andWhere('author.username ILIKE :username', {
            username: handleUnderscore(username)
          })
          .andWhere('post.userSticky = true')
      } else if (!search && !galaxy && !folderId && !universe) {
        // Show stickies from CometX on home page
        stickiesQb
          .andWhere('planet.name ILIKE :planet', {
            planet: 'CometX'
          })
          .andWhere('post.sticky = true')
      }

      const stickies = await stickiesQb.getMany()

      posts = stickies.concat(posts)
    }

    return {
      page: page,
      nextPage: page + 1,
      posts
    } as PostsResponse
  }

  @Query(() => [Post])
  async hiddenPosts(@Ctx() { userId }: Context) {
    if (!userId) return []

    let posts = await this.userRepo
      .createQueryBuilder()
      .relation(User, 'hiddenPosts')
      .of(userId)
      .loadMany()

    if (posts.length === 0) return []

    const qb = this.postRepo
      .createQueryBuilder('post')
      .whereInIds(posts.map(post => post.id))

    posts = await qb.leftJoinAndSelect('post.planet', 'planet').getMany()

    return posts
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg('postId', () => ID) postId: any, @Ctx() { userId }: Context) {
    if (!postId) return null

    postId = parseInt(postId, 36)

    const qb = this.postRepo
      .createQueryBuilder('post')
      .where('post.id  = :postId', { postId })
      .leftJoinAndSelect('post.planet', 'planet')

    const post = await qb.getOne()

    if (!post) return null

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
    { title, link, textContent, planet, image }: SubmitPostArgs,
    @Ctx() { userId }: Context
  ) {
    const cmmnty = await this.planetRepo
      .createQueryBuilder('planet')
      .where('planet.name = :planet', { planet })
      // .leftJoinAndSelect('planet.bannedUsers', 'bannedUser')
      .getOne()

    /*const bannedUsers = await cmmnty.bannedUsers
    if (bannedUsers.map(u => u.id).includes(userId))
      throw new Error('You have been banned from ' + cmmnty.name)*/

    if (textContent) {
      textContent = filterXSS(textContent, { whiteList })
    }

    const post = await this.postRepo.save({
      title,
      link,
      textContent,

      authorId: userId,
      planetId: cmmnty.id,
      rocketCount: 1
    })

    if (image) {
      const { createReadStream, mimetype } = await image

      if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
        throw new Error('Image must be PNG or JPEG')

      const outStream = new Stream.PassThrough()
      createReadStream().pipe(outStream)

      link = await uploadImage(`uploads/${post.id}.png`, outStream, mimetype)
    }

    this.postRocketRepo.save({
      postId: post.id,
      userId: userId
    } as PostRocket)

    this.userRepo.increment({ id: userId }, 'rocketCount', 1)

    return post
  }

  @Authorized('USER')
  @Mutation(() => Boolean)
  async editPost(
    @Arg('postId', () => ID) postId: number,
    @Arg('newTextContent') newTextContent: string,
    @Ctx() { userId }: Context
  ) {
    const post = await this.postRepo.findOne(postId)
    const user = await this.userRepo.findOne(userId)
    if (post.authorId !== userId && !user.admin)
      throw new Error('Attempt to edit post by someone other than author')

    newTextContent = filterXSS(newTextContent, { whiteList })

    await this.postRepo
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
    const post = await this.postRepo.findOne(postId)
    const user = await this.userRepo.findOne(userId)
    if (post.authorId !== userId && !user.admin)
      throw new Error('Attempt to delete post by someone other than author')

    await this.postRepo
      .createQueryBuilder()
      .update()
      .set({ deleted: true })
      .where('id = :postId', { postId })
      .execute()

    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async togglePostRocket(
    @Arg('postId', () => ID) postId: number,
    @Ctx() { userId }: Context
  ) {
    const post = await this.postRepo
      .createQueryBuilder('post')
      .whereInIds(postId)
      .leftJoinAndSelect('post.author', 'author')
      .getOne()

    if (!post) throw new Error('Post not found')

    const rocket = await this.postRocketRepo.findOne({
      postId,
      userId
    })
    if (rocket) {
      await this.postRocketRepo.delete({ postId, userId })
    } else {
      await this.postRocketRepo.save({
        postId,
        userId
      })
    }

    this.postRepo.update(
      { id: postId },
      {
        rocketCount: rocket ? post.rocketCount - 1 : post.rocketCount + 1
      }
    )

    const author = await post.author
    this.userRepo.update(
      { id: author.id },
      {
        rocketCount: rocket ? author.rocketCount - 1 : author.rocketCount + 1
      }
    )

    return !rocket
  }

  @Authorized()
  @Mutation(() => Boolean)
  async hidePost(
    @Arg('postId', () => ID) postId: number,
    @Ctx() { userId }: Context
  ) {
    await this.userRepo
      .createQueryBuilder()
      .relation(User, 'hiddenPosts')
      .of(userId)
      .remove(postId)

    await this.userRepo
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
    await this.userRepo
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
    await this.userRepo
      .createQueryBuilder()
      .relation(User, 'savedPosts')
      .of(userId)
      .remove(postId)

    await this.userRepo
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
    await this.userRepo
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
    const user = await this.userRepo.findOne(userId)

    /*await discordReport(
      user.username,
      process.env.NODE_ENV === 'production'
        ? `${process.env.ORIGIN_URL}/post/${postId}`
        : `http://localhost:3000/post/${postId}`
    )*/

    return true
  }

  @FieldResolver()
  async author(@Root() post: Post, @Ctx() { userLoader }: Context) {
    if (!post.authorId) return null
    return userLoader.load(post.authorId)
  }

  @FieldResolver()
  async rocketed(
    @Root() post: Post,
    @Ctx() { postRocketLoader, userId }: Context
  ) {
    if (!userId) return false
    return postRocketLoader.load({ userId, postId: post.id })
  }

  @Query(() => Metadata)
  async getUrlEmbed(@Arg('URL') URL: string) {
    return scrapeMetadata(URL)
  }
}
