import { useCallback } from 'react'
import { useMutation } from 'urql'
import { UNVOTE_COMMENT, VOTE_COMMENT } from '@/graphql/mutations'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import toast from 'react-hot-toast'
import { ServerPermission } from '@/types/ServerPermission'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const useToggleCommentVote = comment => {
  const { t } = useTranslation()
  const { serverId } = useParams()
  const [_voteRes, vote] = useMutation(VOTE_COMMENT)
  const [_unvoteRes, unvote] = useMutation(UNVOTE_COMMENT)
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
