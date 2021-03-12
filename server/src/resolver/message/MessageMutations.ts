import {
  Arg,
  Args,
  Ctx,
  ID,
  Mutation,
  Publisher,
  PubSub,
  Resolver,
  UseMiddleware
} from 'type-graphql'
import {
  ChatChannel,
  ChatGroup,
  ChatMessage,
  DirectMessage,
  User
} from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'
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
  CheckMessageAuthor,
  CheckMessageChannelPermission,
  CheckBlock
} from '@/util'
import { SendMessageArgs } from '@/resolver/message/types/SendMessageArgs'

@Resolver()
export class MessageMutations {
  @CheckChannelPermission(
    ChannelPermission.SendMessages,
    ServerPermission.SendMessages
  )
  @CheckGroupMember()
  @CheckBlock()
  @Mutation(() => Boolean, { description: 'Create a chat message' })
  async sendMessage(
    @Args() { text, channelId, groupId, userId }: SendMessageArgs,
    @PubSub(SubscriptionTopic.MessageReceived)
    messageCreated: Publisher<ChatMessage>,
    @PubSub(SubscriptionTopic.MessageUpdated)
    messageUpdated: Publisher<ChatMessage>,
    @Ctx() { user, em }: Context
  ): Promise<boolean> {
    const channel = channelId
      ? await em.findOneOrFail(ChatChannel, channelId)
      : null
    const group = groupId ? await em.findOneOrFail(ChatGroup, groupId) : null
    const user2 = userId ? await em.findOneOrFail(User, userId) : null
    const directMessage = user2
      ? await em.findOneOrFail(DirectMessage, {
          $or: [
            { user1: user, user2 },
            { user1: user2, user2: user }
          ]
        })
      : null
    const message = em.create(ChatMessage, {
      text,
      channel,
      group,
      directMessage,
      author: user
    })

    await em.persistAndFlush(message)
    await messageCreated(message)

    this.getLinkMetas(em, messageUpdated, message)

    return true
  }

  @CheckMessageAuthor()
  @Mutation(() => Boolean)
  async editMessage(
    @Arg('text', { description: 'New message text' }) text: string,
    @Arg('messageId', () => ID, { description: 'ID of message to edit' })
    messageId: string,
    @PubSub(SubscriptionTopic.MessageUpdated)
    messageUpdated: Publisher<ChatMessage>,
    @Ctx() { user, em }: Context
  ): Promise<boolean> {
    if (!text) throw new Error('Text cannot be empty')
    const message = await em.findOneOrFail(ChatMessage, messageId)
    message.text = text
    await em.persistAndFlush(message)
    await messageUpdated(message)

    this.getLinkMetas(em, messageUpdated, message)

    return true
  }

  @CheckMessageAuthor()
  @Mutation(() => Boolean, { description: 'Delete a message' })
  async deleteMessage(
    @Arg('messageId', () => ID, { description: 'ID of message to delete' })
    messageId: string,
    @PubSub(SubscriptionTopic.MessageRemoved)
    messageRemoved: Publisher<ChatMessage>,
    @Ctx() { user, em }: Context
  ): Promise<boolean> {
    const message = await em.findOneOrFail(ChatMessage, messageId, ['author'])
    message.isDeleted = true
    await em.persistAndFlush(message)
    await messageRemoved(message)
    return true
  }

  @CheckMessageChannelPermission(
    ChannelPermission.ManageMessages,
    ServerPermission.ManageMessages
  )
  @Mutation(() => Boolean, {
    description:
      'Remove a message (requires ChannelPermission.ManageMessages or ServerPermission.ManageMessages)'
  })
  async removeMessage(
    @Arg('messageId', () => ID, { description: 'ID of message to remove' })
    messageId: string,
    @PubSub(SubscriptionTopic.MessageRemoved)
    messageRemoved: Publisher<ChatMessage>,
    @Ctx() { em }: Context
  ): Promise<boolean> {
    const message = await em.findOneOrFail(ChatMessage, messageId)
    message.isDeleted = true
    await em.persistAndFlush(message)
    await messageRemoved(message)
    return true
  }

  async getLinkMetas(
    em: EntityManager,
    messageUpdated: Publisher<ChatMessage>,
    message: ChatMessage
  ) {
    const linkRegex = /(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/gi
    const links = message.text.match(linkRegex)
    message.linkMetadatas = []
    for (const link of links) {
      const meta = await scrapeMetadata(link)
      if (meta) message.linkMetadatas.push(meta)
    }
    await em.persistAndFlush(message)
    await messageUpdated(message)
  }
}
