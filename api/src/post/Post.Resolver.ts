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
import { uploadImage } from '@/S3Storage'
import { TimeFilter } from '@/TimeFilter'
import { PostSort } from '@/post/PostSort'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Brackets, Repository } from 'typeorm'
import { Comment } from '@/comment/Comment.Entity'
import { Notification } from '@/notification/Notification.Entity'
import { Planet } from '@/planet/Planet.Entity'
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
  @InjectRepository(Comment)
  readonly commentRepo: Repository<Comment>
  @InjectRepository(Notification)
  readonly notificationRepo: Repository<Notification>
  @InjectRepository(Planet)
  readonly planetRepo: Repository<Planet>

  @Query(() => PostsResponse)
  async posts(
    @Args()
    {
      page,
      pageSize,
      sort,
      time,
      joinedOnly,
      folderId,
      planet,
      username,
      q
    }: PostsArgs,
    @Ctx() { userId }: Context
  ) {
    if (q === '')
      return {
        page: 0,
        nextPage: null,
        posts: []
      } as PostsResponse

    const qb = this.postRepo
      .createQueryBuilder('post')
      .andWhere('post.planetId IS NOT NULL')
      .leftJoinAndSelect('post.planet', 'planet')
      .leftJoinAndSelect('post.author', 'author')

    if (planet) {
      qb.andWhere('planet.name ILIKE :planet', {
        planet: handleUnderscore(planet)
      })
    }

    if (username) {
      qb.andWhere('author.username ILIKE :username', {
        username: handleUnderscore(username)
      }).andWhere('post.pinnedByAuthor = false')
    } else if (!q && sort === PostSort.HOT) {
      qb.andWhere('post.pinned = false')
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

    if (userId && !q) {
      const user = await this.userRepo
        .createQueryBuilder('user')
        .where({ id: userId })
        .getOne()

      if (user) {
        if (joinedOnly) {
          qb.andWhere('post.planetId = ANY(:joinedPlanets)', {
            joinedPlanets: user.joinedPlanetIds
          })
        }
      }
    }

    if (q) {
      qb.andWhere(
        new Brackets(qb => {
          qb.andWhere('post.title ILIKE :searchTerm', {
            searchTerm: `%${q}%`
          }).orWhere('post.textContent ILIKE :searchTerm', {
            searchTerm: `%${q}%`
          })
        })
      )
    }

    if (folderId) qb.andWhere(':folderId = ANY(post.folderIds)', { folderId })

    let posts = await qb
      .andWhere('post.deleted = false')
      .andWhere('post.removed = false')
      .skip(page * pageSize)
      .take(pageSize)
      .getMany()

    if (page === 0 && !q && (sort === PostSort.HOT || username)) {
      const stickiesQb = await this.postRepo
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.planet', 'planet')
        .leftJoinAndSelect('post.author', 'author')

      if (planet) {
        stickiesQb
          .andWhere('planet.name ILIKE :planet', {
            planet: handleUnderscore(planet)
          })
          .andWhere('post.pinned = true')
          .addOrderBy('post.pinnedAt', 'DESC')
      } else if (username) {
        stickiesQb
          .andWhere('author.username ILIKE :username', {
            username: handleUnderscore(username)
          })
          .andWhere('post.pinnedByAuthor = true')
          .addOrderBy('post.pinnedByAuthorAt', 'DESC')
      } else if (!q && !folderId) {
        // Show stickies from CometX on home page
        stickiesQb
          .andWhere('planet.name ILIKE :planet', {
            planet: 'CometX'
          })
          .andWhere('post.pinned = true')
          .addOrderBy('post.pinnedAt', 'DESC')
      }

      const stickies = await stickiesQb
        .andWhere('post.deleted = false')
        .andWhere('post.removed = false')
        .getMany()

      posts = stickies.concat(posts)
    }

    return {
      page: page,
      nextPage: posts.length >= pageSize ? page + 1 : null,
      posts
    } as PostsResponse
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg('postId', () => ID) postId: any, @Ctx() { userId }: Context) {
    if (!postId) return null

    postId = parseInt(postId, 36)

    const qb = this.postRepo
      .createQueryBuilder('post')
      .where('post.id  = :postId', { postId })
      .leftJoinAndSelect('post.planet', 'planet')
      .leftJoinAndSelect('post.author', 'author')

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
    { title, link, textContent, planetName, images, nsfw }: SubmitPostArgs,
    @Ctx() { userId }: Context
  ) {
    if (textContent)
      textContent = textContent.replace(/<[^/>][^>]*><\/[^>]+>/, '')

    if (!title && !link && !textContent && (!images || images.length === 0))
      throw new Error('At least one field is required')

    const toSave: any = {
      title,
      authorId: userId,
      nsfw
    }

    if (planetName) {
      const planet = await this.planetRepo
        .createQueryBuilder('planet')
        .where('planet.name ILIKE :planetName', {
          planetName: handleUnderscore(planetName)
        })
        .getOne()

      const bannedUsers = await planet.bannedUsers
      if (bannedUsers.map(u => u.id).includes(userId))
        throw new Error('You have been banned from ' + planet.name)

      toSave.planetId = planet.id
    }

    if (textContent) {
      textContent = filterXSS(textContent, { whiteList })
    }

    const imageUrls = []

    if (images && images.length > 0) {
      for (const image of images) {
        const { createReadStream, mimetype } = await image

        if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
          throw new Error('Image must be PNG or JPEG')

        const imageUrl = await uploadImage(createReadStream(), mimetype)
        imageUrls.push(imageUrl)
      }
    }

    if (link) {
      toSave.linkUrl = link
      toSave.meta = await scrapeMetadata(link)
    }
    if (textContent) toSave.textContent = textContent
    if (imageUrls && imageUrls.length > 0) toSave.imageUrls = imageUrls

    const post = await this.postRepo.save(toSave)

    await this.userRepo.increment({ id: userId }, 'rocketCount', 1)
    await this.userRepo.increment({ id: userId }, 'postCount', 1)

    await this.postRepo
      .createQueryBuilder()
      .relation(Post, 'rocketers')
      .of(post.id)
      .add(userId)

    return post
  }

  @Authorized('AUTHOR')
  @Mutation(() => Boolean)
  async editPost(
    @Arg('postId', () => ID) postId: number,
    @Arg('newTextContent') newTextContent: string,
    @Ctx() { userId }: Context
  ) {
    const post = await this.postRepo.findOne(postId)
    if (post.authorId !== userId)
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

  @Authorized('AUTHOR')
  @Mutation(() => Boolean)
  async deletePost(
    @Arg('postId', () => ID) postId: number,
    @Ctx() { userId }: Context
  ) {
    const post = await this.postRepo.findOne(postId)
    if (post.authorId !== userId)
      throw new Error('Attempt to delete post by someone other than author')

    await this.postRepo.update(postId, {
      deleted: true,
      pinned: false,
      pinnedByAuthor: false
    })
    await this.userRepo.decrement({ id: userId }, 'postCount', 1)

    return true
  }

  @Authorized('AUTHOR')
  @Mutation(() => Boolean)
  async pinPostProfile(@Arg('postId', () => ID) postId: number) {
    await this.postRepo.update(postId, {
      pinnedByAuthor: true,
      pinnedByAuthorAt: new Date()
    })
    return true
  }

  @Authorized('AUTHOR')
  @Mutation(() => Boolean)
  async unpinPostProfile(@Arg('postId', () => ID) postId: number) {
    await this.postRepo.update(postId, { pinnedByAuthor: false })
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async rocketPost(
    @Arg('postId', () => ID) postId: number,
    @Ctx() { userId }: Context
  ) {
    await this.postRepo
      .createQueryBuilder()
      .relation(Post, 'rocketers')
      .of(postId)
      .add(userId)

    await this.postRepo.increment({ id: postId }, 'rocketCount', 1)
    await this.userRepo.increment({ id: userId }, 'rocketCount', 1)

    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unrocketPost(
    @Arg('postId', () => ID) postId: number,
    @Ctx() { userId }: Context
  ) {
    await this.postRepo
      .createQueryBuilder()
      .relation(Post, 'rocketers')
      .of(postId)
      .remove(userId)

    await this.postRepo.decrement({ id: postId }, 'rocketCount', 1)
    await this.userRepo.decrement({ id: userId }, 'rocketCount', 1)

    return true
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

  @FieldResolver()
  async isRocketed(@Root() post: Post, @Ctx() { userId }: Context) {
    if (!userId) return false
    return post.rocketerIds.includes(userId)
  }

  @Query(() => Metadata)
  async getUrlEmbed(@Arg('url') url: string) {
    return scrapeMetadata(url)
  }
}
