import { EntityManager } from '@mikro-orm/postgresql'
import {Comment, User} from '@/entity'
import DataLoader from 'dataloader'
import {logger} from "@/util";

export const commentAuthorLoader = (em: EntityManager) => {
  const loader = new DataLoader<string, User>(
    async (commentIds: string[]) => {
      logger('commentAuthorLoader', commentIds)
      loader.clearAll()
      const comments = await em.find(Comment, commentIds, ['author'])
      const map: Record<string, User> = {}
      commentIds.forEach(commentId => {
        const comment = comments.find(comment => comment.id === commentId)
        if (comment.isDeleted) {
          map[commentId] = null
        } else {
          map[commentId] = comment.author
        }
      })
      return commentIds.map(commentId => map[commentId])
    }
  )
  return loader
}
