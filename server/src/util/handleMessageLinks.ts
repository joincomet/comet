import { scrapeMetadata } from '@/util/metascraper'
import { EntityManager } from '@mikro-orm/postgresql'
import { Publisher } from 'type-graphql/dist/interfaces/Publisher'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'
import { Image, LinkMetadata, Message } from '@/entity'
import { isImageUrl } from '@/util/isImageUrl'
import { uploadImageUrl } from '@/util/s3'

export function getLinksFromText(text: string): string[] {
  const linkRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g
  let links = [...text.matchAll(linkRegex)].flatMap(match => match[2])
  return [...new Set(links)]
}

export async function getMetadatasFromLinks(
  links: string[]
): Promise<LinkMetadata[]> {
  const linkMetadatas: LinkMetadata[] = []
  for (const link of links) {
    const meta = await scrapeMetadata(link)
    if (meta) linkMetadatas.push(meta)
  }
  return linkMetadatas
}

export async function getImagesFromLinks(links: string[]): Promise<Image[]> {
  const images: Image[] = []
  for (const link of links) {
    const isImage = await isImageUrl(link)
    if (isImage) {
      images.push(await uploadImageUrl(link))
    }
  }
  return images
}

export async function handleMessageLinks(
  em: EntityManager,
  messageId: string,
  notifyMessageChanged: Publisher<ChangePayload>
) {
  const message = await em.findOneOrFail(Message, messageId)
  if (message.text) {
    const links = getLinksFromText(message.text)
    message.linkMetadatas = await getMetadatasFromLinks(links)
    message.images = await getImagesFromLinks(links)
  }
  await em.persistAndFlush(message)
  await notifyMessageChanged({ id: message.id, type: ChangeType.Updated })
}
