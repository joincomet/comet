import { RepositoryInjector } from '@/RepositoryInjector'
import { Arg, Authorized, ID, Mutation, UseMiddleware } from 'type-graphql'
import { Community } from '@/entities/Community'
import { s3upload } from '@/S3Storage'
import { Stream } from 'stream'
import { FileUpload, GraphQLUpload } from 'graphql-upload'

export class ModerationResolver extends RepositoryInjector {
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

    await this.communityRepository.update(community, {
      avatarImageUrl: url
    })
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

    await this.communityRepository.update(community, {
      bannerImageUrl: url
    })
    return true
  }

  @Authorized('MOD')
  @Mutation(() => Boolean)
  async setCommunityInfo(
    @Arg('community', () => ID) community: string,
    @Arg('allowTextPosts') allowTextPosts: boolean,
    @Arg('allowLinkPosts') allowLinkPosts: boolean,
    @Arg('allowImagePosts') allowImagePosts: boolean,
    @Arg('modPostsOnly') modPostsOnly: boolean,
    @Arg('description') description: string,
    @Arg('customName', { nullable: true }) customName?: string,
    @Arg('themeColor', { nullable: true }) themeColor?: string
  ) {
    if (customName && customName.length > 50)
      throw new Error('Custom name must be 50 characters or less')

    if (description && description.length > 10000)
      throw new Error('Custom name must be 10000 characters or less')

    if (themeColor && !/^#[0-9A-F]{6}$/i.test(themeColor))
      throw new Error('Invalid color')

    await this.communityRepository.update(community, {
      allowTextPosts,
      allowLinkPosts,
      allowImagePosts,
      modPostsOnly,
      customName,
      description,
      themeColor
    })

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
