import { useCallback } from 'react'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import toast from 'react-hot-toast'
import { ServerPermission } from '@/graphql/hooks'
import { useTranslation } from 'react-i18next'
import {
  useUnvoteCommentMutation,
  useVoteCommentMutation
} from '@/graphql/hooks'

export const useToggleCommentVote = comment => {
  const { t } = useTranslation()
  const [vote] = useVoteCommentMutation({
    optimisticResponse: {
      voteComment: {
        ...comment,
        isVoted: true,
        voteCount: comment.voteCount + 1
      }
    }
  })
  const [unvote] = useUnvoteCommentMutation({
    optimisticResponse: {
      unvoteComment: {
        ...comment,
        isVoted: false,
        voteCount: comment.voteCount - 1
      }
    }
  })

  return useCallback(() => {
    const input = { commentId: comment.id }
    if (comment.isVoted) unvote({ variables: { input } })
    else vote({ variables: { input } })
  }, [comment, vote, unvote, t])
}
