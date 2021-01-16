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

@Resolver()
export class ChatResolver {
  @InjectRepository(User)
  readonly userRepo: Repository<User>
  @InjectRepository(ChatMessage)
  readonly messageRepo: Repository<ChatMessage>
  @InjectRepository(ChatGroup)
  readonly groupRepo: Repository<ChatGroup>
  @InjectRepository(Planet)
  readonly planetRepo: Repository<Planet>
  @InjectRepository(ChatChannel)
  readonly channelRepo: Repository<ChatChannel>

  @Authorized()
  @Query(() => [ChatMessage])
  async messages(
    @Args() { channelId, page, pageSize }: NewMessagesArgs,
    @Ctx() { userId }: Context
  ) {
    const channel = await this.channelRepo.findOne(channelId)
    if (!channel) throw new Error(`Channel ${channelId} does not exist`)
    const err = new Error(`You do not have access to this channel`)
    if (channel.groupId) {
      const group = await channel.group
      const users = await group.users
      if (!users.map(u => u.id).includes(userId)) throw err
    } else if (channel.planetId) {
      const planet = await channel.planet
      const users = await planet.users
      if (!users.map(u => u.id).includes(userId)) throw err
    }

    return this.messageRepo
      .createQueryBuilder('message')
      .andWhere('message.channelId = :channelId', { channelId })
      .andWhere('message.deleted = false')
      .andWhere('message.removed = false')
      .addOrderBy('message.createdAt', 'DESC')
      .skip(page * pageSize)
      .take(pageSize)
      .getMany()
  }

  @Authorized()
  @Mutation(() => Boolean)
  async sendMessage(
    @Arg('message') { text, channelId }: MessageInput,
    @PubSub(Topic.NewMessage)
    notifyAboutNewMessage: Publisher<ChatMessage>,
    @Ctx() { userId }: Context
  ): Promise<boolean> {
    const channel = this.channelRepo.findOne(channelId)
    if (!channel) return false
    const message = await this.messageRepo.save({
      channelId,
      text,
      authorId: userId
    })

    await notifyAboutNewMessage(message)

    return true
  }

  @Authorized()
  @Subscription(() => ChatMessage, {
    topics: Topic.NewMessage,
    filter: ({
      payload,
      args
    }: ResolverFilterData<ChatMessage, NewMessagesArgs>) => {
      return payload.channelId === args.channelId
    }
  })
  newMessages(
    @Root() newMessage: ChatMessage,
    @Args() { channelId }: NewMessagesArgs
  ): ChatMessage {
    return newMessage
  }

  @Authorized()
  @Query(() => ID)
  async getGroupChannelId(
    @Arg('userIds', () => [ID]) userIds: number[],
    @Ctx() { userId }: Context
  ) {
    userIds = userIds.concat(userId)

    let group = await this.groupRepo
      .createQueryBuilder('group')
      .andWhere('group.members <@ :userIds', { userIds })
      .andWhere('group.members @> :userIds', { userIds })
      .getOne()

    if (!group) {
      group = await this.groupRepo.save({
        memberIds: userIds,
        creatorId: userId,
        channel: this.channelRepo.create({})
      })
    }

    return group.channelId
  }

  @Authorized()
  @Query(() => [ChatGroup])
  async chatGroups(@Ctx() { userId }: Context) {
    return this.groupRepo
      .createQueryBuilder('group')
      .andWhere(':userId = ANY(group.members)', { userId })
      .getMany()
  }
}
