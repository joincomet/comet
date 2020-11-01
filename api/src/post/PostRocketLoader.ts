import DataLoader from 'dataloader'
import { getRepository } from 'typeorm'
import { PostRocket } from '@/post/PostRocket.Entity'

export const postRocketLoader = new DataLoader(
  async (keys: { userId: number; postId: number }[]) => {
    const entities = await getRepository(PostRocket)
      .createQueryBuilder('rocket')
      .andWhere('rocket.postId = ANY(:posts)', {
        posts: keys.map(k => k.postId)
      })
      .andWhere('rocket.userId = ANY(:users)', {
        users: keys.map(k => k.userId)
      })
      .getMany()

    return keys.map((key: { userId: number; postId: number }) => {
      const entity = entities.find(
        k => k.userId === key.userId && k.postId === key.postId
      )
      if (entity) return entity.value
      return 0
    })
  }
)
