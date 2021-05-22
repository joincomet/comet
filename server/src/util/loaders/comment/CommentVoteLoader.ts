import { EntityManager } from '@mikro-orm/postgresql'
import { Comment, CommentVote, User } from '@/entity'
import DataLoader from 'dataloader'

export const commentVoteLoader = (em: EntityManager, userId: string) => {
  const loader = new DataLoader<string, boolean>(
    async (commentIds: string[]) => {
      loader.clearAll()
      const commentVotes = await em.find(CommentVote, {
        comment: commentIds,
        user: userId
      })
      const map: Record<string, boolean> = {}
      commentIds.forEach(
        commentId =>
          (map[commentId] = !!commentVotes.find(
            pv => pv.comment === em.getReference(Comment, commentId)
          ))
      )
      return commentIds.map(commentId => map[commentId])
    }
  )
  return loader
}
