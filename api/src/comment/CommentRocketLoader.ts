import DataLoader from 'dataloader'
import { getRepository } from 'typeorm'
import { CommentRocket } from '@/comment/CommentRocket.Entity'

export const commentRocketLoader = new DataLoader(
  async (keys: { userId: number; commentId: number }[]) => {
    const entities = await getRepository(CommentRocket)
      .createQueryBuilder('rocket')
      .andWhere('rocket.commentId = ANY(:comments)', {
        comments: keys.map(k => k.commentId)
      })
      .andWhere('rocket.userId = ANY(:users)', {
        users: keys.map(k => k.userId)
      })
      .getMany()

    return keys.map((key: { userId: number; commentId: number }) => {
      const entity = entities.find(
        k => k.userId === key.userId && k.commentId === key.commentId
      )
      if (entity) return entity.value
      return 0
    })
  }
)
