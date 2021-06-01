import { EntityManager } from '@mikro-orm/postgresql'
import { Comment, ServerUser } from '@/entity'
import DataLoader from 'dataloader'
import {logger} from "@/util";

export const commentServerUserLoader = (em: EntityManager) => {
  const loader = new DataLoader<string, ServerUser>(
    async (commentIds: string[]) => {
      logger('commentServerUserLoader', commentIds)
      loader.clearAll()
      const comments = (await em.find(Comment, {id:commentIds, isDeleted: false}, ['post.server']))
      const serverIds = comments.map(c => c.post.server.id)
      const authorIds = comments.map(c => c.author.id)
      const serverUsers = await em.find(
        ServerUser,
        {
          server: serverIds,
          user: authorIds
        },
        ['user', 'role']
      )
      const map: Record<string, ServerUser> = {}
      commentIds.forEach(commentId => {
        const comment = comments.find(comment => comment.id === commentId)
        if (!comment) {
          map[commentId] = null
        } else {
          map[commentId] = serverUsers.find(
            su => su.server === comment.post.server && su.user === comment.author
          )
        }
      })
      return commentIds.map(commentId => map[commentId])
    }
  )
  return loader
}
