import { Repository } from 'typeorm'
import { Post } from '@/post/Post.Entity'
import { isUrl } from '@/IsUrl'
import { Sema } from 'async-sema'
import { scrapeMetadata } from '@/metascraper/scrapeMetadata'

export const migratePosts = async (postRepo: Repository<Post>) => {
  console.info(
    '--- Retrieving embed data from existing link posts and reuploading images ---'
  )
  let posts = await postRepo
    .createQueryBuilder('post')
    .where('post.linkUrl IS NOT NULL')
    .orderBy('post.createdAt', 'DESC')
    .getMany()

  if (!posts || posts.length === 0) throw new Error('No posts retrieved')

  posts = posts.filter(p => isUrl(p.linkUrl))

  const sema = new Sema(20, { capacity: posts.length })

  async function fetchEmbedData(post: Post) {
    if (!isUrl(post.linkUrl)) return

    await sema.acquire()
    try {
      const meta = await scrapeMetadata(post.linkUrl)
      if (meta) {
        await postRepo.update(post.id, { meta })
        console.log(`Completed ${post.linkUrl}`)
      }
    } finally {
      sema.release()
    }
  }

  await Promise.all(posts.map(fetchEmbedData))
}
