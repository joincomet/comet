import { Arg, Authorized, Ctx, ID, Mutation } from 'type-graphql'
import { Planet } from '@/planet/Planet.Entity'
import { uploadImage } from '@/S3Storage'
import { Stream } from 'stream'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { User } from '@/user/User.Entity'
import { Repository } from 'typeorm'
import { Post } from '@/post/Post.Entity'
import { Comment } from '@/comment/Comment.Entity'
import { handleUnderscore } from '@/handleUnderscore'
import { discordClient } from '@/discord/DiscordClient'
import { Context } from '@/Context'
import { TextChannel } from 'discord.js'
import { Notification } from '@/notification/Notification.Entity'
import { Color } from '@/Color'
import { Galaxy } from '@/Galaxy'

export class ModerationResolver {
  @InjectRepository(User) readonly userRepo: Repository<User>
  @InjectRepository(Post) readonly postRepo: Repository<Post>
  @InjectRepository(Comment) readonly commentRepo: Repository<Comment>
  @InjectRepository(Planet) readonly planetRepo: Repository<Planet>
  @InjectRepository(Notification)
  readonly notificationRepo: Repository<Notification>

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async removePost(
    @Arg('postId', () => ID) postId: number,
    @Arg('reason') reason: string,
    @Arg('planetId', () => ID, { nullable: true }) planetId?: string
  ) {
    await this.postRepo.update(postId, {
      removed: true,
      removedReason: reason,
      pinned: false,
      pinnedByAuthor: false
    })
    const post = await this.postRepo.findOne(postId)
    await this.userRepo.decrement({ id: post.authorId }, 'postCount', 1)

    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async pinPost(
    @Arg('planetId', () => ID) planetId: number,
    @Arg('postId', () => ID) postId: number
  ) {
    await this.postRepo.update(postId, { pinned: true, pinnedAt: new Date() })
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async unpinPost(
    @Arg('planetId', () => ID) planetId: number,
    @Arg('postId', () => ID) postId: number
  ) {
    await this.postRepo.update(postId, { pinned: false })
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async removeComment(
    @Arg('planetId', () => ID) planetId: number,
    @Arg('commentId', () => ID) commentId: number,
    @Arg('reason') reason: string
  ) {
    await this.commentRepo.update(commentId, {
      removed: true,
      removedReason: reason,
      pinned: false
    })
    const comment = await this.commentRepo.findOne(commentId)
    await this.postRepo.decrement({ id: comment.postId }, 'commentCount', 1)
    await this.userRepo.decrement({ id: comment.authorId }, 'commentCount', 1)
    await this.notificationRepo.delete({ commentId })

    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async banUserFromPlanet(
    @Arg('planetId', () => ID) planetId: number,
    @Arg('bannedId', () => ID) bannedId: number,
    @Arg('reason') reason: string
  ) {
    await this.planetRepo
      .createQueryBuilder()
      .relation(Planet, 'bannedUsers')
      .of(planetId)
      .add(bannedId)
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async unbanUserFromPlanet(
    @Arg('planetId', () => ID) planetId: number,
    @Arg('bannedUserId', () => ID) bannedUserId: number
  ) {
    await this.planetRepo
      .createQueryBuilder()
      .relation(Planet, 'bannedUsers')
      .of(planetId)
      .remove(bannedUserId)
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async uploadPlanetAvatar(
    @Arg('planetId', () => ID) planetId: number,
    @Arg('file', () => GraphQLUpload) file: FileUpload
  ) {
    const { createReadStream, mimetype } = await file

    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')

    const avatarUrl = await uploadImage(createReadStream(), file.mimetype, {
      width: 256,
      height: 256
    })

    await this.planetRepo.update(planetId, { avatarUrl })

    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async uploadPlanetBanner(
    @Arg('planetId', () => ID) planetId: number,
    @Arg('file', () => GraphQLUpload) file: FileUpload
  ) {
    const { createReadStream, mimetype } = await file

    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')

    const bannerUrl = await uploadImage(createReadStream(), file.mimetype, {
      width: 1920
    })

    await this.planetRepo.update(planetId, { bannerUrl })

    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async addModerator(
    @Arg('planetId', () => ID) planetId: number,
    @Arg('username') username: string
  ) {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .where('user.username ILIKE :username', {
        username: handleUnderscore(username)
      })
      .andWhere('user.banned = false')
      .leftJoinAndSelect('user.moderatedPlanets', 'moderatedPlanet')
      .getOne()

    if (!user) throw new Error('User not found')
    if (user.moderatedPlanetIds.find(id => id === planetId)) {
      throw new Error(`${user.username} is already a moderator`)
    }
    if (user.moderatedPlanetIds.length >= 5)
      throw new Error(`${user.username} cannot moderate more than 5 planets`)

    const planet = await this.planetRepo.findOne(planetId)

    await this.planetRepo
      .createQueryBuilder()
      .relation(Planet, 'moderators')
      .of(planet)
      .add(user.id)
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async editPlanetDescription(
    @Arg('planetId', () => ID) planetId: number,
    @Arg('description') description: string
  ) {
    if (description.length > 1000)
      throw new Error('Description cannot be longer than 1000 characters')
    await this.planetRepo.update(planetId, { description })
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async setPlanetColor(
    @Arg('planetId', () => ID) planetId: number,
    @Arg('color', () => Color) color: Color
  ) {
    await this.planetRepo.update(planetId, { color })
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async setPlanetGalaxy(
    @Arg('planetId', () => ID) planetId: number,
    @Arg('galaxy', () => Galaxy) galaxy: Galaxy
  ) {
    await this.planetRepo.update(planetId, { galaxy })
    return true
  }

  @Mutation(() => Boolean)
  async reportPost(
    @Arg('postId', () => ID) postId: number,
    @Arg('reason') reason: string,
    @Ctx() { userId }: Context
  ) {
    let user
    if (userId) user = await this.userRepo.findOne(userId)
    const post = await this.postRepo.findOne(postId)
    const author = await post.author
    await (discordClient.channels.cache.get(
      process.env.DISCORD_REPORTS_CHANNEL
    ) as TextChannel).send(
      `${user ? user.username : 'Anonymous'} reported a post by ${
        author.username
      } for "${reason}": https://cometx.io${post.relativeUrl}`
    )
    return true
  }

  @Mutation(() => Boolean)
  async reportComment(
    @Arg('commentId', () => ID) commentId: number,
    @Arg('reason') reason: string,
    @Ctx() { userId }: Context
  ) {
    let user
    if (userId) user = await this.userRepo.findOne(userId)
    const comment = await this.commentRepo.findOne(commentId)
    const post = await this.postRepo.findOne(comment.postId)
    const author = await comment.author
    await (discordClient.channels.cache.get(
      process.env.DISCORD_REPORTS_CHANNEL
    ) as TextChannel).send(
      `${user ? user.username : 'Anonymous'} reported a comment by ${
        author.username
      } on https://cometx.io${post.relativeUrl} for "${reason}":\n"${
        comment.textContent
      }"`
    )
    return true
  }
}
