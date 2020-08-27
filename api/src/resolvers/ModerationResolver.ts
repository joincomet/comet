import { RepositoryInjector } from '../RepositoryInjector'
import { Arg, ID, Mutation, UseMiddleware } from 'type-graphql'
import { Planet } from '../entities/Planet'
import { s3upload } from '../S3Storage'
import { Stream } from 'stream'
import { RequiresMod } from '../middleware/RequiresMod'
import { FileUpload, GraphQLUpload } from 'graphql-upload'

export class ModerationResolver extends RepositoryInjector {
  @Mutation(() => Boolean)
  @UseMiddleware(RequiresMod)
  async removePost(
    @Arg('planetName', () => ID) planetName: string,
    @Arg('postId', () => ID) postId: string,
    @Arg('removedReason') removedReason: string
  ) {
    await this.postRepository.update(postId, { removed: true, removedReason })
    return true
  }

  @Mutation(() => Boolean)
  @UseMiddleware(RequiresMod)
  async pinPost(
    @Arg('planetName', () => ID) planetName: string,
    @Arg('postId', () => ID) postId: string
  ) {
    await this.postRepository.update(postId, { sticky: true })
    return true
  }

  @Mutation(() => Boolean)
  @UseMiddleware(RequiresMod)
  async unpinPost(
    @Arg('planetName', () => ID) planetName: string,
    @Arg('postId', () => ID) postId: string
  ) {
    await this.postRepository.update(postId, { sticky: false })
    return true
  }

  @Mutation(() => Boolean)
  @UseMiddleware(RequiresMod)
  async removeComment(
    @Arg('planetName', () => ID) planetName: string,
    @Arg('commentId', () => ID) commentId: string,
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

  @Mutation(() => Boolean)
  @UseMiddleware(RequiresMod)
  async banUserFromPlanet(
    @Arg('planetName', () => ID) planetName: string,
    @Arg('bannedUserId', () => ID) bannedUserId: string
  ) {
    await this.planetRepository
      .createQueryBuilder()
      .relation(Planet, 'bannedUsers')
      .of(planetName)
      .add(bannedUserId)
    return true
  }

  @Mutation(() => Boolean)
  @UseMiddleware(RequiresMod)
  async unbanUserFromPlanet(
    @Arg('planetName', () => ID) planetName: string,
    @Arg('bannedUserId', () => ID) bannedUserId: string
  ) {
    await this.planetRepository
      .createQueryBuilder()
      .relation(Planet, 'bannedUsers')
      .of(planetName)
      .remove(bannedUserId)
    return true
  }

  @Mutation(() => Boolean)
  @UseMiddleware(RequiresMod)
  async uploadPlanetAvatarImage(
    @Arg('planetName', () => ID) planetName: string,
    @Arg('file', () => GraphQLUpload) file: FileUpload
  ) {
    const { createReadStream, mimetype } = await file

    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')

    const outStream = new Stream.PassThrough()
    createReadStream().pipe(outStream)

    const url = await s3upload(
      `planet/${planetName}/avatar.png`,
      outStream,
      file.mimetype
    )

    await this.planetRepository.update(planetName, { avatarImageUrl: url })
    return true
  }

  @Mutation(() => Boolean)
  @UseMiddleware(RequiresMod)
  async uploadPlanetBannerImage(
    @Arg('planetName', () => ID) planetName: string,
    @Arg('file', () => GraphQLUpload) file: FileUpload
  ) {
    const { createReadStream, mimetype } = await file

    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')

    const outStream = new Stream.PassThrough()
    createReadStream().pipe(outStream)

    const url = await s3upload(
      `planet/${planetName}/banner.png`,
      outStream,
      file.mimetype
    )

    await this.planetRepository.update(planetName, { bannerImageUrl: url })
    return true
  }

  @Mutation(() => Boolean)
  @UseMiddleware(RequiresMod)
  async setPlanetInfo(
    @Arg('planetName', () => ID) planetName: string,
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

    await this.planetRepository.update(planetName, {
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

  @Mutation(() => Boolean)
  @UseMiddleware(RequiresMod)
  async removePlanetAvatar(@Arg('planetName', () => ID) planetName: string) {
    await this.planetRepository.update(planetName, { avatarImageUrl: null })
    return true
  }

  @Mutation(() => Boolean)
  @UseMiddleware(RequiresMod)
  async removePlanetBanner(@Arg('planetName', () => ID) planetName: string) {
    await this.planetRepository.update(planetName, { bannerImageUrl: null })
    return true
  }

  @Mutation(() => Boolean)
  @UseMiddleware(RequiresMod)
  async addModerator(
    @Arg('planetName', () => ID) planetName: string,
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
      !!(await user.moderatedPlanets).find(
        (p) => p.name.toLowerCase() === planetName.toLowerCase()
      )
    ) {
      throw new Error(
        `${user.username} is already a moderator of ${planetName}`
      )
    }
    if ((await user.moderatedPlanets).length >= 10)
      throw new Error(`${user.username} cannot moderate more than 10 planets`)

    await this.planetRepository
      .createQueryBuilder()
      .relation(Planet, 'moderators')
      .of(planetName)
      .add(user.id)
    return true
  }
}
