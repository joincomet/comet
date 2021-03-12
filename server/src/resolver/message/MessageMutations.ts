import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Publisher,
  PubSub,
  Resolver
} from 'type-graphql'
import { ChatMessage, ChatChannel } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'
import { scrapeMetadata } from '@/util/metascraper'
import {
  SubscriptionTopic,
  Context,
  ChannelPermission,
  ServerPermission
} from '@/types'

@Resolver()
export class MessageMutations {
  @Authorized(ServerPermission.SendMessages)
  @Mutation(() => Boolean, { description: 'Create a chat message' })
  async sendMessage(
    @Arg('text', { description: 'Message text' }) text: string,
    @Arg('channelId', () => ID, {
      description: 'ID of channel to send message'
    })
    channelId: string,
    @PubSub(SubscriptionTopic.MessageSent)
    messageCreated: Publisher<ChatMessage>,
    @PubSub(SubscriptionTopic.MessageUpdated)
    messageUpdated: Publisher<ChatMessage>,
    @Ctx() { user, em }: Context
  ): Promise<boolean> {
    const channel = await em.findOneOrFail(ChatChannel, channelId, [
      'group',
      'dm',
      'server'
    ])
    if (channel.group) await user.checkInGroup(em, channel.group.id)
    else if (channel.server) await user.checkJoinedServer(em, channel.server.id)
    else if (channel.directMessage)
      await user.checkInDM(em, channel.directMessage)
    else throw new Error('Channel does not have a group, server, nor DM')

    const message = em.create(ChatMessage, {
      text,
      channel,
      author: user
    })

    await em.persistAndFlush(message)
    await messageCreated(message)

    this.getLinkMetas(em, messageUpdated, message)

    return true
  }

  @Authorized(ServerPermission.SendMessages)
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
    if (message.author !== user)
      throw new Error('You are not the author of this message')

    message.text = text
    await em.persistAndFlush(message)
    await messageUpdated(message)

    this.getLinkMetas(em, messageUpdated, message)

    return true
  }

  @Authorized(ServerPermission.SendMessages)
  @Mutation(() => Boolean, { description: 'Delete a message' })
  async deleteMessage(
    @Arg('messageId', () => ID, { description: 'ID of message to delete' })
    messageId: string,
    @PubSub(SubscriptionTopic.MessageRemoved)
    messageRemoved: Publisher<ChatMessage>,
    @Ctx() { user, em }: Context
  ): Promise<boolean> {
    const message = await em.findOneOrFail(ChatMessage, messageId, ['author'])
    if (message.author.id !== user.id)
      throw new Error('You are not the author of this message')

    message.isDeleted = true
    await em.persistAndFlush(message)
    await messageRemoved(message)
    return true
  }

  @Authorized([
    ChannelPermission.ManageMessages,
    ServerPermission.ManageMessages
  ])
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
    const message = await em.findOneOrFail(ChatMessage, messageId, ['author'])
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
