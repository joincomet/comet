import { Arg, Authorized, ID, Mutation } from 'type-graphql'
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

export class ModerationResolver {
  @InjectRepository(User) readonly userRepo: Repository<User>
  @InjectRepository(Post) readonly postRepo: Repository<Post>
  @InjectRepository(Comment) readonly commentRepo: Repository<Comment>
  @InjectRepository(Planet) readonly planetRepo: Repository<Planet>

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async removePost(
    @Arg('planetId', () => ID) planetId: string,
    @Arg('postId', () => ID) postId: number,
    @Arg('reason') reason: string
  ) {
    await this.postRepo.update(postId, { removed: true, removedReason: reason })
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
    const comment = await this.commentRepo.findOne(commentId)
    this.postRepo.decrement({ id: comment.postId }, 'commentCount', 1)

    await this.commentRepo.update(commentId, {
      removed: true,
      removedReason: reason
    })
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
    if ((await user.moderatedPlanets).find(p => p.id === planetId)) {
      throw new Error(`${user.username} is already a moderator`)
    }
    if ((await user.moderatedPlanets).length >= 3)
      throw new Error(`${user.username} cannot moderate more than 3 planets`)

    const planet = await this.planetRepo.findOne(planetId)

    await this.planetRepo
      .createQueryBuilder()
      .relation(Planet, 'moderators')
      .of(planet)
      .add(user.id)
    return true
  }
}
