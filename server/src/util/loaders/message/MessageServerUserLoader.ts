import { EntityManager } from '@mikro-orm/postgresql'
import { Message, ServerUser } from '@/entity'
import DataLoader from 'dataloader'
import {logger} from "@/util";

export const messageServerUserLoader = (em: EntityManager) => {
  const loader = new DataLoader<string, ServerUser>(
    async (messageIds: string[]) => {
      logger('messageServerUserLoader', messageIds)
      loader.clearAll()
      const messages = await em.find(Message, {id: messageIds, channel: {$ne: null}},['channel'])
      const serverIds = messages
        .map(m => m.channel.server.id)
      const authorIds = messages
        .map(m => m.author.id)
      const serverUsers = await em.find(
        ServerUser,
        {server: serverIds, user: authorIds},
        ['user', 'role']
      )
      const map: Record<string, ServerUser> = {}
      messageIds.forEach(messageId => {
        const message = messages.find(message => message.id === messageId)
        map[messageId] = message?.channel
          ? serverUsers.find(su => su.server === message.channel.server && su.user === message.author)
          : null
      })
      return messageIds.map(messageId => map[messageId])
    }
  )
  return loader
}
