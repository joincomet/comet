import { EntityManager } from '@mikro-orm/postgresql'
import { Comment, CommentVote, VoteType } from '@/entity'
import DataLoader from 'dataloader'
import {logger} from "@/util";

export const commentVoteLoader = (em: EntityManager, userId: string) => {
  const loader = new DataLoader<string, VoteType>(
    async (commentIds: string[]) => {
      logger('commentVoteLoader', commentIds)
      loader.clearAll()
      if (!userId) return commentIds.map(_ => VoteType.None)
      const commentVotes = await em.find(CommentVote, {
        comment: commentIds,
        user: userId
      })
      const map: Record<string, VoteType> = {}
      commentIds.forEach(
        commentId =>
          (map[commentId] =
            commentVotes.find(
              pv => pv.comment === em.getReference(Comment, commentId)
            )?.type ?? VoteType.None)
      )
      return commentIds.map(commentId => map[commentId])
    }
  )
  return loader
}
