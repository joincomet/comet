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

export class ModerationResolver {
  @InjectRepository(User) readonly userRepository: Repository<User>
  @InjectRepository(Post) readonly postRepository: Repository<Post>
  @InjectRepository(Comment) readonly commentRepository: Repository<Comment>
  @InjectRepository(Planet) readonly planetRepository: Repository<Planet>

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async removePost(
    @Arg('planet', () => ID) planet: string,
    @Arg('postId', () => ID) postId: number,
    @Arg('removedReason') removedReason: string
  ) {
    await this.postRepository.update(postId, { removed: true, removedReason })
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async pinPost(
    @Arg('planet', () => ID) planet: string,
    @Arg('postId', () => ID) postId: number
  ) {
    await this.postRepository.update(postId, { sticky: true })
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async unpinPost(
    @Arg('planet', () => ID) planet: string,
    @Arg('postId', () => ID) postId: number
  ) {
    await this.postRepository.update(postId, { sticky: false })
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async removeComment(
    @Arg('planet', () => ID) planet: string,
    @Arg('commentId', () => ID) commentId: number,
    @Arg('removedReason') removedReason: string
  ) {
    const comment = await this.commentRepository.findOne(commentId)
    this.postRepository.decrement({ id: comment.postId }, 'commentCount', 1)

    await this.commentRepository.update(commentId, {
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
    await this.planetRepository
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
    await this.planetRepository
      .createQueryBuilder()
      .relation(Planet, 'bannedUsers')
      .of(planet)
      .remove(bannedUserId)
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async uploadPlanetAvatarImage(
    @Arg('planet', () => ID) planet: string,
    @Arg('file', () => GraphQLUpload) file: FileUpload
  ) {
    const { createReadStream, mimetype } = await file

    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')

    const outStream = new Stream.PassThrough()
    createReadStream().pipe(outStream)

    const url = await uploadImage(
      `planet/${planet}/avatar.png`,
      outStream,
      file.mimetype
    )

    // TODO
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async uploadPlanetBannerImage(
    @Arg('planet', () => ID) planet: string,
    @Arg('file', () => GraphQLUpload) file: FileUpload
  ) {
    const { createReadStream, mimetype } = await file

    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')

    const outStream = new Stream.PassThrough()
    createReadStream().pipe(outStream)

    const url = await uploadImage(
      `planet/${planet}/banner.png`,
      outStream,
      file.mimetype
    )

    // TODO
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async addModerator(
    @Arg('planet', () => ID) planet: string,
    @Arg('username') username: string
  ) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username ILIKE :username', {
        username: username.replace(/_/g, '\\_')
      })
      .andWhere('user.banned = false')
      .leftJoinAndSelect('user.moderatedPlanets', 'moderatedPlanet')
      .getOne()

    if (!user) throw new Error('User not found')
    if (
      (await user.moderatedPlanets).find(
        p => (p.planet as Planet).name.toLowerCase() === planet.toLowerCase()
      )
    ) {
      throw new Error(`${user.username} is already a moderator of ${planet}`)
    }
    if ((await user.moderatedPlanets).length >= 3)
      throw new Error(`${user.username} cannot moderate more than 3 planets`)

    await this.planetRepository
      .createQueryBuilder()
      .relation(Planet, 'moderators')
      .of(planet)
      .add(user.id)
    return true
  }
}
