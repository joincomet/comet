import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { Context } from '@/Context'
import { User } from '@/user/User.Entity'
import { Comment } from '@/comment/Comment.Entity'
import { Stream } from 'stream'
import { uploadImage } from '@/S3Storage'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'
import { handleUnderscore } from '@/handleUnderscore'

@Resolver(() => User)
export class UserResolver {
  @InjectRepository(User)
  readonly userRepo: Repository<User>
  @InjectRepository(Comment)
  readonly commentRepo: Repository<Comment>

  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() { userId }: Context) {
    if (!userId) {
      return null
    }

    await this.userRepo.update(userId, { lastLogin: new Date() })

    return this.userRepo
      .createQueryBuilder('user')
      .whereInIds(userId)
      .leftJoinAndSelect('user.moderatedPlanets', 'mp')
      .getOne()
  }

  @Query(() => User, { nullable: true })
  async user(@Arg('username') username: string) {
    if (!username) return null

    return this.userRepo
      .createQueryBuilder('user')
      .where('user.username ILIKE :username', {
        username: handleUnderscore(username)
      })
      .leftJoinAndSelect('user.moderatedPlanets', 'moderatedPlanet')
      .getOne()
  }

  @Mutation(() => String)
  @Authorized()
  async uploadAvatar(
    @Arg('file', () => GraphQLUpload) file: FileUpload,
    @Ctx() { userId }: Context
  ) {
    const { createReadStream, mimetype } = await file

    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')

    const avatarUrl = await uploadImage(createReadStream(), file.mimetype, {
      width: 256,
      height: 256
    })
    await this.userRepo.update(userId, { avatarUrl })
    return avatarUrl
  }

  @Mutation(() => String)
  @Authorized()
  async uploadBanner(
    @Arg('file', () => GraphQLUpload) file: FileUpload,
    @Ctx() { userId }: Context
  ) {
    const { createReadStream, mimetype } = await file

    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      throw new Error('Image must be PNG or JPEG')

    const bannerUrl = await uploadImage(createReadStream(), file.mimetype, {
      width: 1920
    })
    await this.userRepo.update(userId, { bannerUrl })
    return bannerUrl
  }

  @Mutation(() => Boolean)
  @Authorized()
  async editBio(@Arg('bio') bio: string, @Ctx() { userId }: Context) {
    bio = bio.trim()
    if (!bio) throw new Error('Bio cannot be empty')
    if (bio.length > 300)
      throw new Error('Bio cannot be longer than 300 characters')
    await this.userRepo.update(userId, { bio })
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async blockUser(
    @Arg('blockedId', () => ID) blockedId: number,
    @Ctx() { userId }: Context
  ) {
    if (blockedId === userId) {
      throw new Error('Cannot block yourself')
    }

    const blockedUser = await this.userRepo.findOne(blockedId)

    if (!blockedUser) throw new Error('User does not exist')

    await this.userRepo
      .createQueryBuilder('user')
      .relation(User, 'blockTo')
      .of(userId)
      .add(blockedUser.id)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unblockUser(
    @Arg('blockedId', () => ID) blockedId: number,
    @Ctx() { userId }: Context
  ) {
    if (blockedId === userId) {
      throw new Error('Cannot unblock yourself')
    }

    await this.userRepo
      .createQueryBuilder('user')
      .relation(User, 'blockTo')
      .of(userId)
      .remove(blockedId)
    return true
  }

  @FieldResolver(() => Boolean)
  async isCurrentUser(@Root() user: User, @Ctx() { userId }: Context) {
    return user.id === userId
  }
}
