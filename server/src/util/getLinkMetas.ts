import { scrapeMetadata } from '@/util/metascraper'

export async function getLinkMetas(text: string) {
  const linkRegex = /(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/gi
  const links = text.match(linkRegex) || []
  const linkMetadatas = []
  for (const link of links) {
    const meta = await scrapeMetadata(link)
    if (meta) linkMetadatas.push(meta)
  }
  return linkMetadatas
}
