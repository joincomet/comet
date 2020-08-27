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
import { RepositoryInjector } from '../RepositoryInjector'
import { Post, PostType } from '../entities/Post'
import { SubmitPostArgs } from '../args/SubmitPostArgs'
import { RequiresAuth } from '../middleware/RequiresAuth'
import { Context } from '../Context'
import shortid from 'shortid'
import Mercury from '@postlight/mercury-parser'
// @ts-ignore
import isImageUrl from 'is-image-url'
// @ts-ignore
import Url from 'url-parse'
import { getThumbnailUrl } from '../thumbnail'
import { PostView } from '../entities/PostView'
// @ts-ignore
import { FeedArgs, Filter, Sort, Time } from '../args/FeedArgs'
import axios from 'axios'
import sharp from 'sharp'
import { User } from '../entities/User'
import { s3 } from '../s3'
import { discordReport } from '../DiscordBot'
import cheerio from 'cheerio'
import request from 'request'
// @ts-ignore
import isUrl from 'is-url'
import { filterXSS } from 'xss'
import { whiteList } from '../xssWhiteList'
import { Planet } from '../entities/Planet'
import { PostEndorsement } from '../entities/PostEndorsement'
import { Stream } from 'stream'
import { s3upload } from '../S3Storage'

@Resolver(() => Post)
export class PostResolver extends RepositoryInjector {
  @Query(() => String)
  async getTitleAtUrl(@Arg('url') url: string) {
    if (!isUrl(url)) return ''
    let result
    try {
      result = await new Promise((resolve, reject) =>
        request(url, function (error, response, body) {
          let output = url // default to URL
          if (!error && response.statusCode === 200) {
            const $ = cheerio.load(body)
            output = $('head > title').text().trim()
            resolve(output)
          } else {
            reject(error)
          }
        })
      )
    } catch (e) {
      result = ''
    }

    return result
  }

  @Query(() => [Post])
  async feed(
    @Args()
    {
      page,
      pageSize,
      sort,
      time,
      filter,
      types,
      planetName,
      galaxyName,
      username,
      search
    }: FeedArgs,
    @Ctx() { userId }: Context
  ) {
    const qb = this.postRepository
      .createQueryBuilder('post')
      .andWhere('post.deleted = false')
      .andWhere('post.removed = false')
      .leftJoinAndSelect('post.planet', 'planet')
      .leftJoinAndSelect('planet.galaxy', 'galaxy')

    if (planetName) {
      qb.andWhere(':planetName ILIKE post.planet', { planetName }).andWhere(
        'post.sticky = false'
      )
    }

    if (galaxyName) {
      qb.andWhere(':galaxyName ILIKE galaxy.name', { galaxyName })
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

    if (types.length === 1 || types.length === 2) {
      qb.andWhere('post.type = ANY(:types)', {
        types: types.map((type) => type.toUpperCase())
      })
    }

    if (sort === Sort.NEW) {
      qb.addOrderBy('post.createdAt', 'DESC')
    } else if (sort === Sort.HOT) {
      qb.addSelect(
        '(CAST(post.endorsementCount AS float) + 1)/((CAST((CAST(EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) AS int) - CAST(EXTRACT(EPOCH FROM post.createdAt) AS int)+5000) AS FLOAT)/100.0)^(1.6))',
        'post_hotrank'
      )
      qb.addOrderBy('post_hotrank', 'DESC')
    } else if (sort === Sort.TOP || sort === Sort.MOSTCOMMENTS) {
      switch (time) {
        case Time.HOUR:
          qb.andWhere("post.createdAt > NOW() - INTERVAL '1 hour'")
          break
        case Time.DAY:
          qb.andWhere("post.createdAt > NOW() - INTERVAL '1 day'")
          break
        case Time.WEEK:
          qb.andWhere("post.createdAt > NOW() - INTERVAL '1 week'")
          break
        case Time.MONTH:
          qb.andWhere("post.createdAt > NOW() - INTERVAL '1 month'")
          break
        case Time.YEAR:
          qb.andWhere("post.createdAt > NOW() - INTERVAL '1 year'")
          break
        case Time.ALL:
          break
        default:
          break
      }
      if (sort === Sort.TOP) {
        qb.addOrderBy('post.endorsementCount', 'DESC')
      } else if (sort === Sort.MOSTCOMMENTS) {
        qb.addOrderBy('post.commentCount', 'DESC')
      }
      qb.addOrderBy('post.createdAt', 'DESC')
    }

    if (userId) {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .whereInIds(userId)
        .leftJoinAndSelect('user.planets', 'planets')
        .leftJoinAndSelect('user.mutedPlanets', 'mutedPlanets')
        .leftJoinAndSelect('user.blockedUsers', 'blockedUsers')
        .leftJoinAndSelect('user.hiddenPosts', 'hiddenPosts')
        .getOne()

      if (user) {
        const mutedPlanets = (await user.mutedPlanets).map(
          (planet) => planet.name
        )
        const blockedUsers = (await user.blockedUsers).map((user) => user.id)
        const hiddenPosts = (await user.hiddenPosts).map((post) => post.id)

        if (!planetName && filter === Filter.MYPLANETS) {
          const planets = (await user.planets).map((planet) => planet.name)
          qb.andWhere('post.planet = ANY(:planets)', { planets })
        }

        if (mutedPlanets.length > 0) {
          qb.andWhere('NOT (post.planet = ANY(:mutedPlanets))', {
            mutedPlanets
          })
        }

        qb.andWhere('NOT (post.authorId = ANY(:blockedUsers))', {
          blockedUsers
        })

        qb.andWhere('NOT (post.id = ANY(:hiddenPosts))', { hiddenPosts })

        qb.loadRelationCountAndMap(
          'post.personalEndorsementCount',
          'post.endorsements',
          'endorsement',
          (qb) => {
            return qb
              .andWhere('endorsement.active = true')
              .andWhere('endorsement.userId = :userId', { userId })
          }
        )

        qb.loadRelationCountAndMap(
          'planet.personalUserCount',
          'planet.users',
          'user',
          (qb) => {
            return qb.andWhere('user.id = :userId', { userId })
          }
        )
      }
    }

    let posts = await qb
      .skip(page * pageSize)
      .take(pageSize)
      .loadRelationCountAndMap('planet.userCount', 'planet.users')
      .getMany()

    if (planetName && page === 0) {
      const stickiesQb = await this.postRepository
        .createQueryBuilder('post')
        .andWhere('post.sticky = true')
        .andWhere('post.planet = :planetName', {
          planetName
        })
        .leftJoinAndSelect('post.planet', 'planet')
        .leftJoinAndSelect('planet.galaxy', 'galaxy')
        .loadRelationCountAndMap('planet.userCount', 'planet.users')
        .addOrderBy('post.createdAt', 'DESC')

      if (userId) {
        stickiesQb.loadRelationCountAndMap(
          'post.personalEndorsementCount',
          'post.endorsements',
          'endorsement',
          (qb) => {
            return qb
              .andWhere('endorsement.active = true')
              .andWhere('endorsement.userId = :userId', { userId })
          }
        )

        stickiesQb.loadRelationCountAndMap(
          'planet.personalUserCount',
          'planet.users',
          'user',
          (qb) => {
            return qb.andWhere('user.id = :userId', { userId })
          }
        )
      }

      const stickies = await stickiesQb.getMany()

      posts = stickies.concat(posts)
    }

    for (const p of posts) {
      p.isEndorsed = Boolean(p.personalEndorsementCount)
      ;(await p.planet).joined = Boolean((await p.planet).personalUserCount)
      p.isHidden = false
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
      .whereInIds(posts.map((post) => post.id))

    qb.loadRelationCountAndMap(
      'post.personalEndorsementCount',
      'post.endorsements',
      'endorsement',
      (qb) => {
        return qb
          .andWhere('endorsement.active = true')
          .andWhere('endorsement.userId = :userId', { userId })
      }
    )

    posts = await qb.leftJoinAndSelect('post.planet', 'planet').getMany()

    posts.forEach((post) => {
      post.isEndorsed = Boolean(post.personalEndorsementCount)
      post.isHidden = true
    })

    return posts
  }

  @Query(() => Post, { nullable: true })
  async post(
    @Arg('postId', () => ID) postId: string,
    @Ctx() { userId }: Context
  ) {
    if (!postId) return null

    const qb = this.postRepository
      .createQueryBuilder('post')
      .where('post.id = :postId', { postId })
      .leftJoinAndSelect('post.planet', 'planet')
      .loadRelationCountAndMap('planet.userCount', 'planet.users')
      .leftJoinAndSelect('planet.galaxy', 'galaxy')

    if (userId) {
      qb.loadRelationCountAndMap(
        'post.personalEndorsementCount',
        'post.endorsements',
        'endorsement',
        (qb) => {
          return qb
            .andWhere('endorsement.active = true')
            .andWhere('endorsement.userId = :userId', { userId })
        }
      )
      qb.loadRelationCountAndMap(
        'planet.personalUserCount',
        'planet.users',
        'user',
        (qb) => {
          return qb.andWhere('user.id = :userId', { userId })
        }
      )
    }

    const post = await qb.getOne()

    if (!post) return null

    post.isEndorsed = Boolean(post.personalEndorsementCount)
    ;(await post.planet).joined = Boolean((await post.planet).personalUserCount)

    if (post.deleted) {
      post.authorId = null
      post.author = null
      if (post.type === 'TEXT') post.textContent = '<p>[deleted]</p>'
    }

    if (post.removed) {
      post.authorId = null
      post.author = null
      if (post.type === 'TEXT')
        post.textContent = `<p>[removed: ${post.removedReason}]</p>`
    }

    return post
  }

  @Mutation(() => PostView, { nullable: true })
  async recordPostView(
    @Arg('postId', () => ID) postId: string,
    @Ctx() { userId }: Context
  ) {
    if (!userId) return null

    let postView = await this.postViewRepository.findOne({ postId, userId })

    const post = await this.postRepository
      .createQueryBuilder('post')
      .andWhereInIds(postId)
      .getOne()

    if (!post) throw new Error('Invalid post id')

    if (postView) {
      await this.postViewRepository.update({ userId, postId }, {
        createdAt: new Date(),
        lastCommentCount: post.commentCount
      } as PostView)
    } else {
      postView = await this.postViewRepository.save({
        createdAt: new Date(),
        userId,
        postId,
        lastCommentCount: post.commentCount
      } as PostView)
    }

    this.userRepository.findOne(userId).then((user) => {
      if (!user.appearOffline) {
        this.userRepository.update(userId, { lastLogin: new Date() })
      }
    })

    return postView
  }

  @UseMiddleware(RequiresAuth)
  @Mutation(() => Post)
  async submitPost(
    @Args() { title, type, link, textContent, planet, image }: SubmitPostArgs,
    @Ctx() { userId }: Context
  ) {
    const p = await this.planetRepository
      .createQueryBuilder('planet')
      .where('planet.name = :planet', { planet })
      .leftJoinAndSelect('planet.bannedUsers', 'bannedUser')
      .getOne()
    const bannedUsers = await p.bannedUsers
    if (bannedUsers.map((u) => u.id).includes(userId))
      throw new Error('You have been banned from ' + planet)

    /*if (user.lastPostedAt && !user.admin) {
      if (differenceInSeconds(new Date(), user.lastPostedAt) < 60 * 2) {
        throw new Error('Please wait 2 minutes between posts')
      }
    }*/

    const postId = shortid.generate()

    if (textContent) {
      textContent = filterXSS(textContent, { whiteList })
    }

    if (image) {
      const { createReadStream, mimetype } = await image

      if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
        throw new Error('Image must be PNG or JPEG')

      const outStream = new Stream.PassThrough()
      createReadStream().pipe(outStream)

      link = await s3upload(`uploads/${postId}.png`, outStream, mimetype, false)
    }

    this.userRepository.update(userId, { lastPostedAt: new Date() })

    const url = new Url(link)
    let parseResult: any = null
    if (type === PostType.LINK || type === PostType.IMAGE) {
      if (isImageUrl(link)) {
        parseResult = {
          lead_image_url: link
        }
        type = PostType.IMAGE
      } else {
        const longTask = () =>
          new Promise(async (resolve) => {
            try {
              resolve(await Mercury.parse(link))
            } catch (e) {
              resolve({})
            }
          })

        const timeout = (cb: any, interval: number) => () =>
          new Promise((resolve) => setTimeout(() => cb(resolve), interval))

        const onTimeout = timeout((resolve: any) => resolve({}), 3000)

        parseResult = await Promise.race([longTask, onTimeout].map((f) => f()))

        if (!parseResult.lead_image_url) {
          try {
            parseResult.lead_image_url = await getThumbnailUrl(link)
          } catch (e) {}
        }
      }
      parseResult.domain = url.hostname
    }

    let s3UploadLink = ''

    if (
      (type === PostType.LINK || type === PostType.IMAGE) &&
      parseResult &&
      parseResult.lead_image_url
    ) {
      try {
        const response = await axios.get(parseResult.lead_image_url, {
          responseType: 'arraybuffer'
        })
        const resizedImage = await sharp(response.data)
          .resize(80, 60, {
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .jpeg()
          .toBuffer()

        s3UploadLink = await new Promise((resolve, reject) =>
          s3.upload(
            {
              Bucket: process.env.AWS_S3_BUCKET,
              Key: `thumbs/${postId}.jpg`,
              Body: resizedImage,
              ContentType: 'image/jpeg'
            },
            (err, data) => {
              if (err) reject(err)
              else resolve(data.Location.replace('s3.amazonaws.com/', ''))
            }
          )
        )
      } catch (e) {}
    }

    const post = await this.postRepository.save({
      id: postId,
      title,
      type,
      link,
      textContent,
      createdAt: new Date(),
      authorId: userId,
      thumbnailUrl: s3UploadLink ? s3UploadLink : undefined,
      domain: parseResult ? parseResult.domain.replace('www.', '') : undefined,
      planet: { name: planet } as Planet,
      endorsementCount: 1
    } as Post)

    this.postEndorsementRepository.save({
      postId,
      userId,
      active: true,
      createdAt: new Date()
    } as PostEndorsement)

    this.userRepository.increment({ id: userId }, 'endorsementCount', 1)

    return post
  }

  @UseMiddleware(RequiresAuth)
  @Mutation(() => Boolean)
  async editPost(
    @Arg('postId', () => ID) postId: string,
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

  @UseMiddleware(RequiresAuth)
  @Mutation(() => Boolean)
  async deletePost(
    @Arg('postId', () => ID) postId: string,
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

  @UseMiddleware(RequiresAuth)
  @Mutation(() => Boolean)
  async togglePostEndorsement(
    @Arg('postId', () => ID) postId: string,
    @Ctx() { userId }: Context
  ) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .whereInIds(postId)
      .leftJoinAndSelect('post.author', 'author')
      .getOne()
    if (!post) throw new Error('Invalid postId')

    let active: boolean

    const endorsement = await this.postEndorsementRepository.findOne({
      postId,
      userId
    })
    if (endorsement) {
      await this.postEndorsementRepository.update(
        { postId, userId },
        { active: !endorsement.active }
      )
      active = !endorsement.active
    } else {
      await this.postEndorsementRepository.save({
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
        endorsementCount: active
          ? post.endorsementCount + 1
          : post.endorsementCount - 1
      }
    )

    const author = await post.author
    this.userRepository.update(
      { id: author.id },
      {
        endorsementCount: active
          ? author.endorsementCount + 1
          : author.endorsementCount - 1
      }
    )

    return active
  }

  @UseMiddleware(RequiresAuth)
  @Mutation(() => Boolean)
  async hidePost(
    @Arg('postId', () => ID) postId: string,
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

  @UseMiddleware(RequiresAuth)
  @Mutation(() => Boolean)
  async unhidePost(
    @Arg('postId', () => ID) postId: string,
    @Ctx() { userId }: Context
  ) {
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'hiddenPosts')
      .of(userId)
      .remove(postId)
    return true
  }

  @UseMiddleware(RequiresAuth)
  @Mutation(() => Boolean)
  async savePost(
    @Arg('postId', () => ID) postId: string,
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

  @UseMiddleware(RequiresAuth)
  @Mutation(() => Boolean)
  async unsavePost(
    @Arg('postId', () => ID) postId: string,
    @Ctx() { userId }: Context
  ) {
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'savedPosts')
      .of(userId)
      .remove(postId)
    return true
  }

  @UseMiddleware(RequiresAuth)
  @Mutation(() => Boolean)
  async reportPost(
    @Arg('postId', () => ID) postId: string,
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

  @FieldResolver()
  async postView(
    @Root() post: Post,
    @Ctx() { postViewLoader, userId }: Context
  ) {
    if (!userId) return null
    return postViewLoader.load({ postId: post.id, userId })
  }
}
