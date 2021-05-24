import { scrapeMetadata } from '@/util/metascraper'
import { EntityManager } from '@mikro-orm/postgresql'
import { Publisher } from 'type-graphql/dist/interfaces/Publisher'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'
import { Message } from '@/entity'

export async function getLinkMetas(text: string) {
  const linkRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g
  const links = [...text.matchAll(linkRegex)].flatMap(match => match[2])
  const linkMetadatas = []
  for (const link of links) {
    const meta = await scrapeMetadata(link)
    if (meta) linkMetadatas.push(meta)
  }
  return linkMetadatas
}

export async function setMessageLinkMetas(
  em: EntityManager,
  messageId: string,
  notifyMessageChanged: Publisher<ChangePayload>
) {
  const message = await em.findOneOrFail(Message, messageId)
  if (message.text) message.linkMetadatas = await getLinkMetas(message.text)
  await em.persistAndFlush(message)
  await notifyMessageChanged({ id: message.id, type: ChangeType.Updated })
}
