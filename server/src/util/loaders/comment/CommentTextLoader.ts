import { EntityManager } from '@mikro-orm/postgresql'
import { Comment } from '@/entity'
import DataLoader from 'dataloader'
import {logger} from "@/util";

export const commentTextLoader = (em: EntityManager) => {
  const loader = new DataLoader<string, string>(
    async (commentIds: string[]) => {
      logger('commentTextLoader', commentIds)
      loader.clearAll()
      const comments = await em.find(Comment, commentIds)
      const map: Record<string, string> = {}
      commentIds.forEach(commentId => {
        const comment = comments.find(comment => comment.id === commentId)
        if (comment.isDeleted) {
          map[commentId] = '[deleted]'
        } else {
          map[commentId] = comment.text
        }
      })
      return commentIds.map(commentId => map[commentId])
    }
  )
  return loader
}
