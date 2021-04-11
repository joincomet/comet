import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Publisher,
  PubSub,
  Resolver
} from 'type-graphql'
import { Message, User } from '@/entity'
import { scrapeMetadata } from '@/util/metascraper'
import {
  ChannelPermission,
  Context,
  ServerPermission,
  SubscriptionTopic
} from '@/types'
import {
  CheckChannelPermission,
  CheckGroupMember,
  CheckMessageAuthor
} from '@/util'
import { DmPayload } from '@/resolver/message/subscriptions/DmPayload'
import { MessagePayload } from '@/resolver/message/subscriptions/MessagePayload'
import {
  TypingArgs,
  TypingPayload
} from '@/resolver/message/mutations/startTyping'
import {
  SendMessageArgs,
  sendMessage
} from '@/resolver/message/mutations/sendMessage'
import {
  EditMessageArgs,
  editMessage
} from '@/resolver/message/mutations/editMessage'
import { deleteMessage } from '@/resolver/message/mutations/deleteMessage'
import { closeDm } from '@/resolver/message/mutations/closeDm'
import { startTyping } from '@/resolver/message/mutations/startTyping'
import { readDm } from '@/resolver/message/mutations/readDm'

@Resolver()
export class MessageMutations {
  @CheckChannelPermission(
    ChannelPermission.SendMessages,
    ServerPermission.SendMessages
  )
  @CheckGroupMember()
  @Mutation(() => Message, { description: 'Create a chat message' })
  async sendMessage(
    @Ctx() ctx: Context,
    @Args() args: SendMessageArgs,
    @PubSub(SubscriptionTopic.MessageSent)
    messageSent: Publisher<MessagePayload>,
    @PubSub(SubscriptionTopic.DmOpened)
    notifyDmOpened: Publisher<DmPayload>
  ): Promise<Message> {
    return sendMessage(ctx, args, messageSent, notifyDmOpened)
  }

  @CheckMessageAuthor()
  @Mutation(() => Message)
  async editMessage(
    @Ctx() ctx: Context,
    @Args() args: EditMessageArgs,
    @PubSub(SubscriptionTopic.MessageUpdated)
    notifyMessageUpdated: Publisher<MessagePayload>
  ): Promise<Message> {
    return editMessage(ctx, args, notifyMessageUpdated)
  }

  @CheckMessageAuthor()
  @Mutation(() => Boolean, { description: 'Delete a message' })
  async deleteMessage(
    @Ctx() ctx: Context,
    @Arg('messageId', () => ID, { description: 'ID of message to delete' })
    messageId: string,
    @PubSub(SubscriptionTopic.MessageDeleted)
    notifyMessageDeleted: Publisher<MessagePayload>
  ): Promise<boolean> {
    return deleteMessage(ctx, messageId, notifyMessageDeleted)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async closeDm(
    @Ctx() ctx: Context,
    @Arg('userId', () => ID) userId: string,
    @PubSub(SubscriptionTopic.DmClosed)
    notifyDmClosed: Publisher<DmPayload>
  ): Promise<boolean> {
    return closeDm(ctx, userId, notifyDmClosed)
  }

  @CheckChannelPermission(ChannelPermission.SendMessages)
  @CheckGroupMember()
  @Mutation(() => Boolean)
  async startTyping(
    @Ctx() ctx: Context,
    @Args() args: TypingArgs,
    @PubSub(SubscriptionTopic.Typing)
    notifyUserStartedTyping: Publisher<TypingPayload>
  ): Promise<boolean> {
    return startTyping(ctx, args, notifyUserStartedTyping)
  }

  async getLinkMetas(message: Message) {
    const linkRegex = /(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/gi
    const links = message.text.match(linkRegex) || []
    const linkMetadatas = []
    for (const link of links) {
      const meta = await scrapeMetadata(link)
      if (meta) linkMetadatas.push(meta)
    }
    return linkMetadatas
  }

  @Authorized()
  @Mutation(() => User)
  async readDm(
    @Ctx() ctx: Context,
    @Arg('userId', () => ID) userId: string,
    @PubSub(SubscriptionTopic.DmRead) notifyDmRead: Publisher<DmPayload>
  ): Promise<User> {
    return readDm(ctx, userId, notifyDmRead)
  }
}
