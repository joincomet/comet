import {
  Arg,
  Args,
  Ctx,
  ID,
  Mutation,
  Publisher,
  PubSub,
  Resolver
} from 'type-graphql'
import { Channel, DirectMessage, Group, Message, User } from '@/entity'
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
    @Ctx() { user, em }: Context,
    @Args() { text, channelId, groupId, userId }: SendMessageArgs,
    @PubSub(SubscriptionTopic.MessageReceived)
    messageReceived: Publisher<Message>,
    @PubSub(SubscriptionTopic.MessageUpdated)
    messageUpdated: Publisher<Message>,
    @PubSub(SubscriptionTopic.RefetchGroupsAndDms)
    refetchGroupsAndDms: Publisher<string>
  ): Promise<boolean> {
    const channel = channelId
      ? await em.findOneOrFail(Channel, channelId)
      : null
    const group = groupId ? await em.findOneOrFail(Group, groupId) : null
    const toUser = userId ? await em.findOneOrFail(User, userId) : null

    const message = em.create(Message, {
      text,
      channel,
      group,
      toUser,
      author: user
    })

    message.linkMetadatas = await this.getLinkMetas(message)
    await em.persistAndFlush(message)
    await messageReceived(message)

    if (toUser) {
      const [myDm, theirDm] = await this.saveDm({ user, em }, userId)
      myDm.isHidden = false
      theirDm.isHidden = false
      await em.persistAndFlush([myDm, theirDm])
      await refetchGroupsAndDms(user.id)
      await refetchGroupsAndDms(toUser.id)
    }

    return true
  }

  @Mutation(() => Boolean)
  async createDm(
    @Ctx() { user, em }: Context,
    @Arg('userId', () => ID) userId
  ) {
    const [myDm, theirDm] = await this.saveDm({ user, em }, userId)
    await em.persistAndFlush([myDm, theirDm])
    return true
  }

  async saveDm({ user, em }: Context, userId: string) {
    const toUser = await em.findOneOrFail(User, userId)
    let myDm = await em.findOne(DirectMessage, { user, toUser })
    let theirDm = await em.findOne(DirectMessage, {
      user: toUser,
      toUser: user
    })

    if (!myDm)
      myDm = em.create(DirectMessage, { user, toUser, isHidden: false })
    if (!theirDm)
      theirDm = em.create(DirectMessage, {
        user: toUser,
        toUser: user,
        isHidden: true
      })

    myDm.updatedAt = new Date()
    theirDm.updatedAt = new Date()

    return [myDm, theirDm]
  }

  @CheckMessageAuthor()
  @Mutation(() => Boolean)
  async editMessage(
    @Arg('text', { description: 'New message text' }) text: string,
    @Arg('messageId', () => ID, { description: 'ID of message to edit' })
    messageId: string,
    @PubSub(SubscriptionTopic.MessageUpdated)
    messageUpdated: Publisher<Message>,
    @Ctx() { user, em }: Context
  ): Promise<boolean> {
    if (!text) throw new Error('Text cannot be empty')
    const message = await em.findOneOrFail(Message, messageId)
    message.text = text
    message.linkMetadatas = await this.getLinkMetas(message)
    await em.persistAndFlush(message)
    await messageUpdated(message)
    return true
  }

  @CheckMessageAuthor()
  @Mutation(() => Boolean, { description: 'Delete a message' })
  async deleteMessage(
    @Arg('messageId', () => ID, { description: 'ID of message to delete' })
    messageId: string,
    @PubSub(SubscriptionTopic.MessageRemoved)
    messageRemoved: Publisher<Message>,
    @Ctx() { user, em }: Context
  ): Promise<boolean> {
    const message = await em.findOneOrFail(Message, messageId, ['author'])
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
    messageRemoved: Publisher<Message>,
    @Ctx() { em }: Context
  ): Promise<boolean> {
    const message = await em.findOneOrFail(Message, messageId)
    message.isDeleted = true
    await em.persistAndFlush(message)
    await messageRemoved(message)
    return true
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
}
