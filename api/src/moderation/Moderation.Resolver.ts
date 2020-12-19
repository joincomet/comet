import { Arg, Authorized, ID, Mutation, UseMiddleware } from 'type-graphql'
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
    @Arg('planet', () => ID) planet: string,
    @Arg('postId', () => ID) postId: number,
    @Arg('removedReason') removedReason: string
  ) {
    await this.postRepo.update(postId, { removed: true, removedReason })
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async pinPost(
    @Arg('planet', () => ID) planet: string,
    @Arg('postId', () => ID) postId: number
  ) {
    await this.postRepo.update(postId, { pinned: true })
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async unpinPost(
    @Arg('planet', () => ID) planet: string,
    @Arg('postId', () => ID) postId: number
  ) {
    await this.postRepo.update(postId, { pinned: false })
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async removeComment(
    @Arg('planet', () => ID) planet: string,
    @Arg('commentId', () => ID) commentId: number,
    @Arg('removedReason') removedReason: string
  ) {
    const comment = await this.commentRepo.findOne(commentId)
    this.postRepo.decrement({ id: comment.postId }, 'commentCount', 1)

    await this.commentRepo.update(commentId, {
      removed: true,
      removedReason
    })
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async banUserFromPlanet(
    @Arg('planet', () => ID) planet: string,
    @Arg('bannedUserId', () => ID) bannedUserId: number
  ) {
    await this.planetRepo
      .createQueryBuilder()
      .relation(Planet, 'bannedUsers')
      .of(planet)
      .add(bannedUserId)
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async unbanUserFromPlanet(
    @Arg('planet', () => ID) planet: string,
    @Arg('bannedUserId', () => ID) bannedUserId: number
  ) {
    await this.planetRepo
      .createQueryBuilder()
      .relation(Planet, 'bannedUsers')
      .of(planet)
      .remove(bannedUserId)
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async uploadPlanetAvatarImage(
    @Arg('planetName', () => String) planetName: string,
    @Arg('file', () => GraphQLUpload) file: FileUpload
  ) {
    const { createReadStream, mimetype } = await file

    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')

    const outStream = new Stream.PassThrough()
    createReadStream().pipe(outStream)

    const avatarUrl = await uploadImage(outStream, file.mimetype)

    await this.planetRepo.update({ name: planetName }, { avatarUrl })

    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async uploadPlanetBannerImage(
    @Arg('planetName', () => String) planetName: string,
    @Arg('file', () => GraphQLUpload) file: FileUpload
  ) {
    const { createReadStream, mimetype } = await file

    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')

    const outStream = new Stream.PassThrough()
    createReadStream().pipe(outStream)

    const bannerUrl = await uploadImage(outStream, file.mimetype)

    await this.planetRepo.update({ name: planetName }, { bannerUrl })

    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async addModerator(
    @Arg('planetName', () => String) planetName: string,
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
    if (
      (await user.moderatedPlanets).find(
        p => p.name.toLowerCase() === planetName.toLowerCase()
      )
    ) {
      throw new Error(
        `${user.username} is already a moderator of ${planetName}`
      )
    }
    if ((await user.moderatedPlanets).length >= 3)
      throw new Error(`${user.username} cannot moderate more than 3 planets`)

    const planet = await this.planetRepo.findOne({ name: planetName })

    await this.planetRepo
      .createQueryBuilder()
      .relation(Planet, 'moderators')
      .of(planet)
      .add(user.id)
    return true
  }
}
