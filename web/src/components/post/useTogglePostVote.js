import { useCallback } from 'react'
import { useMutation } from 'urql'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import toast from 'react-hot-toast'
import { ServerPermission } from '@/types/ServerPermission'
import { useTranslation } from 'react-i18next'
import { useUnvotePostMutation, useVotePostMutation } from '@/graphql/hooks'

export const useTogglePostVote = post => {
  const { t } = useTranslation()
  const [_voteRes, vote] = useVotePostMutation()
  const [_unvoteRes, unvote] = useUnvotePostMutation()
  const [canVote] = useHasServerPermissions({
    serverId: post?.server.id,
    permissions: [ServerPermission.VotePost]
  })

  return useCallback(() => {
    const vars = { postId: post.id }
    if (!canVote) {
      toast.error(t('post.context.votePermission'))
      return
    }
    if (post.isVoted) unvote(vars)
    else vote(vars)
  }, [post, canVote, vote, unvote, t])
}
