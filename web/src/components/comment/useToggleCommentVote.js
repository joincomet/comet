import { useCallback } from 'react'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import toast from 'react-hot-toast'
import { ServerPermission } from '@/graphql/hooks'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  useUnvoteCommentMutation,
  useVoteCommentMutation
} from '@/graphql/hooks'

export const useToggleCommentVote = comment => {
  const { t } = useTranslation()
  const { serverId } = useParams()
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
  const [canVote] = useHasServerPermissions({
    serverId,
    permissions: [ServerPermission.VoteComment]
  })

  return useCallback(() => {
    const input = { commentId: comment.id }
    if (!canVote) {
      toast.error(t('comment.context.votePermission'))
      return
    }
    if (comment.isVoted) unvote({ variables: { input } })
    else vote({ variables: { input } })
  }, [comment, canVote, vote, unvote, t])
}
