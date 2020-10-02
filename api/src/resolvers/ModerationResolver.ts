import { Arg, Authorized, ID, Mutation, UseMiddleware } from 'type-graphql'
import { Community } from '@/entities/Community'
import { s3upload } from '@/S3Storage'
import { Stream } from 'stream'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { User } from '@/entities/User'
import { Repository } from 'typeorm'
import { Post } from '@/entities/Post'
import { Comment } from '@/entities/Comment'

export class ModerationResolver {
  @InjectRepository(User) readonly userRepository: Repository<User>
  @InjectRepository(Post) readonly postRepository: Repository<Post>
  @InjectRepository(Comment) readonly commentRepository: Repository<Comment>
  @InjectRepository(Community) readonly communityRepository: Repository<
    Community
  >

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async removePost(
    @Arg('community', () => ID) community: string,
    @Arg('postId', () => ID) postId: number,
    @Arg('removedReason') removedReason: string
  ) {
    await this.postRepository.update(postId, { removed: true, removedReason })
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async pinPost(
    @Arg('community', () => ID) community: string,
    @Arg('postId', () => ID) postId: number
  ) {
    await this.postRepository.update(postId, { sticky: true })
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async unpinPost(
    @Arg('community', () => ID) community: string,
    @Arg('postId', () => ID) postId: number
  ) {
    await this.postRepository.update(postId, { sticky: false })
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async removeComment(
    @Arg('community', () => ID) community: string,
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
  async banUserFromCommunity(
    @Arg('community', () => ID) community: string,
    @Arg('bannedUserId', () => ID) bannedUserId: number
  ) {
    await this.communityRepository
      .createQueryBuilder()
      .relation(Community, 'bannedUsers')
      .of(community)
      .add(bannedUserId)
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async unbanUserFromCommunity(
    @Arg('community', () => ID) community: string,
    @Arg('bannedUserId', () => ID) bannedUserId: number
  ) {
    await this.communityRepository
      .createQueryBuilder()
      .relation(Community, 'bannedUsers')
      .of(community)
      .remove(bannedUserId)
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async uploadCommunityAvatarImage(
    @Arg('community', () => ID) community: string,
    @Arg('file', () => GraphQLUpload) file: FileUpload
  ) {
    const { createReadStream, mimetype } = await file

    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')

    const outStream = new Stream.PassThrough()
    createReadStream().pipe(outStream)

    const url = await s3upload(
      `community/${community}/avatar.png`,
      outStream,
      file.mimetype
    )

    // TODO
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async uploadCommunityBannerImage(
    @Arg('community', () => ID) community: string,
    @Arg('file', () => GraphQLUpload) file: FileUpload
  ) {
    const { createReadStream, mimetype } = await file

    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')

    const outStream = new Stream.PassThrough()
    createReadStream().pipe(outStream)

    const url = await s3upload(
      `community/${community}/banner.png`,
      outStream,
      file.mimetype
    )

    // TODO
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async addModerator(
    @Arg('community', () => ID) community: string,
    @Arg('username') username: string
  ) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username ILIKE :username', {
        username: username.replace(/_/g, '\\_')
      })
      .andWhere('user.banned = false')
      .leftJoinAndSelect('user.moderatedCommunities', 'moderatedCommunity')
      .getOne()

    if (!user) throw new Error('User not found')
    if (
      (await user.moderatedCommunities).find(
        (p) => p.name.toLowerCase() === community.toLowerCase()
      )
    ) {
      throw new Error(`${user.username} is already a moderator of ${community}`)
    }
    if ((await user.moderatedCommunities).length >= 3)
      throw new Error(
        `${user.username} cannot moderate more than 3 communities`
      )

    await this.communityRepository
      .createQueryBuilder()
      .relation(Community, 'moderators')
      .of(community)
      .add(user.id)
    return true
  }
}
