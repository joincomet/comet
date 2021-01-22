import DataLoader from 'dataloader'
import { getRepository } from 'typeorm'
import { Comment } from '@/comment/Comment.Entity'

export const commentRocketedLoader = new DataLoader(
  async (keys: { userId: number; commentId: number }[]) => {
    const comments = await getRepository(Comment)
      .createQueryBuilder('comment')
      .where('comment.id = ANY(:commentIds)', {
        commentIds: keys.map(k => k.commentId)
      })
      .leftJoinAndSelect('comment.rocketers', 'user')
      .getMany()

    return Promise.all(
      keys.map(async ({ userId, commentId }) =>
        (await comments.find(c => c.id === commentId).rocketers)
          .map(u => u.id)
          .includes(userId)
      )
    )
  }
)
