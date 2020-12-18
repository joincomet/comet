import DataLoader from 'dataloader'
import { getRepository } from 'typeorm'
import { Post } from '@/post/Post.Entity'

export const postRocketedLoader = new DataLoader(
  async (keys: { userId: number; postId: number }[]) => {
    const posts = await getRepository(Post)
      .createQueryBuilder('post')
      .where('post.id = ANY(:postIds)', {
        postIds: keys.map(k => k.postId)
      })
      .leftJoinAndSelect('post.rocketers', 'user')
      .getMany()

    return Promise.all(
      keys.map(async ({ userId, postId }) =>
        (await posts.find(p => p.id === postId).rocketers)
          .map(u => u.id)
          .includes(userId)
      )
    )
  }
)
