import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  ResolverFilterData,
  Root,
  Subscription
} from 'type-graphql'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { User } from '@/user/User.Entity'
import { Repository } from 'typeorm'
import { ChatMessage } from '@/chat/ChatMessage.Entity'
import { ChatGroup } from '@/chat/ChatGroup.Entity'
import { ChatChannel } from '@/chat/ChatChannel.Entity'
import { Topic } from '@/chat/Topic'
import { MessageInput } from '@/chat/MessageInput'
import { NewMessagesArgs } from '@/chat/NewMessagesArgs'
import { Context } from '@/Context'
import { Planet } from '@/planet/Planet.Entity'
import { Post } from '@/post/Post.Entity'
import { Folder } from '@/folder/Folder.Entity'
import { randomEnum } from '@/randomEnum'
import { Color } from '@/Color'

@Resolver()
export class FolderResolver {
  @InjectRepository(User)
  readonly userRepo: Repository<User>
  @InjectRepository(Post)
  readonly postRepo: Repository<Post>
  @InjectRepository(Folder)
  readonly folderRepo: Repository<Folder>

  @Authorized()
  @Query(() => [Folder])
  async folders(@Ctx() { userId }: Context) {
    return this.folderRepo
      .createQueryBuilder('folder')
      .andWhere('folder.creatorId = :userId', { userId })
      .andWhere('folder.deleted = false')
      .getMany()
  }

  @Query(() => Folder)
  async folder(@Arg('folderId', () => ID) folderId: number) {
    return this.folderRepo
      .createQueryBuilder('folder')
      .andWhere('folder.id = :folderId', { folderId })
      .andWhere('folder.deleted = false')
      .getOne()
  }

  @Authorized()
  @Mutation(() => Boolean)
  async addPostToFolder(
    @Arg('postId', () => ID) postId: number,
    @Arg('folderId', () => ID) folderId: number,
    @Ctx() { userId }: Context
  ) {
    const folder = await this.folderRepo.findOne(folderId)
    if (!folder) throw new Error('Invalid folder')
    if (folder.creatorId !== userId)
      throw new Error('You do not have permission to modify this folder')

    await this.folderRepo
      .createQueryBuilder()
      .relation(Folder, 'posts')
      .of(folderId)
      .add(postId)

    await this.folderRepo.update(folderId, { updatedAt: new Date() })

    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async removePostFromFolder(
    @Arg('postId', () => ID) postId: number,
    @Arg('folderId', () => ID) folderId: number,
    @Ctx() { userId }: Context
  ) {
    const folder = await this.folderRepo.findOne(folderId)
    if (!folder) throw new Error('Invalid folder')
    if (folder.creatorId !== userId)
      throw new Error('You do not have permission to modify this folder')

    await this.folderRepo
      .createQueryBuilder()
      .relation(Folder, 'posts')
      .of(folderId)
      .remove(postId)

    await this.folderRepo.update(folderId, { updatedAt: new Date() })

    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async createFolder(@Arg('name') name: string, @Ctx() { userId }: Context) {
    if (name.length > 50)
      throw new Error('Name cannot be longer than 50 characters')

    const folder = await this.folderRepo
      .createQueryBuilder('folder')
      .where('folder.creatorId = :userId', { userId })
      .andWhere('folder.name ILIKE :name', { name })
      .getOne()
    if (folder) throw new Error('You already have a folder with that name')

    await this.folderRepo.save({
      creatorId: userId,
      name,
      color: randomEnum(Color)
    })

    return true
  }
}
