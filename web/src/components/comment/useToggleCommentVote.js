import { useCallback } from 'react'
import { useMutation } from 'urql'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import toast from 'react-hot-toast'
import { ServerPermission } from '@/types/ServerPermission'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  useUnvoteCommentMutation,
  useVoteCommentMutation
} from '@/graphql/hooks'

export const useToggleCommentVote = comment => {
  const { t } = useTranslation()
  const { serverId } = useParams()
  const [_voteRes, vote] = useVoteCommentMutation()
  const [_unvoteRes, unvote] = useUnvoteCommentMutation()
  const [canVote] = useHasServerPermissions({
    serverId,
    permissions: [ServerPermission.VoteComment]
  })

  return useCallback(() => {
    const vars = { commentId: comment.id }
    if (!canVote) {
      toast.error(t('comment.context.votePermission'))
      return
    }
    if (comment.isVoted) unvote(vars)
    else vote(vars)
  }, [comment, canVote, vote, unvote, t])
}
