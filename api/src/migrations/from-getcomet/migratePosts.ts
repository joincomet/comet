import { Repository } from 'typeorm'
import { Post } from '@/post/Post.Entity'
import { isURL } from '@/IsURL'
import { Sema } from 'async-sema'
import {scrapeMetadata} from "@/metascraper/scrapeMetadata";

export const migratePosts = async (postRepo: Repository<Post>) => {
  console.info(
    '--- Retrieving embed data from existing link posts and reuploading images ---'
  )
  let posts = await postRepo
    .createQueryBuilder('post')
    .where('post.linkURL IS NOT NULL')
    .orderBy('post.createdAt', 'DESC')
    .getMany()

  if (!posts || posts.length === 0) throw new Error('No posts retrieved')

  posts = posts.filter(p => isURL(p.linkURL))

  const sema = new Sema(10, { capacity: posts.length })

  async function fetchEmbedData(post: Post) {
    if (!isURL(post.linkURL)) return

    await sema.acquire()
    try {
      const meta = await scrapeMetadata(post.linkURL)
      if (meta) {
        await postRepo.update(post.id, { meta })
      }
    } finally {
      sema.release()
    }
  }

  await Promise.all(posts.map(fetchEmbedData))
}
