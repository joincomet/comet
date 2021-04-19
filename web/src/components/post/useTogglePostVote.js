import { useCallback } from 'react'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import toast from 'react-hot-toast'
import { ServerPermission } from '@/types/ServerPermission'
import { useTranslation } from 'react-i18next'
import { useUnvotePostMutation, useVotePostMutation } from '@/graphql/hooks'

export const useTogglePostVote = post => {
  const { t } = useTranslation()
  const [vote] = useVotePostMutation()
  const [unvote] = useUnvotePostMutation()
  const [canVote] = useHasServerPermissions({
    serverId: post?.server.id,
    permissions: [ServerPermission.VotePost]
  })

  return useCallback(() => {
    const variables = { postId: post.id }
    if (!canVote) {
      toast.error(t('post.context.votePermission'))
      return
    }
    if (post.isVoted) unvote({ variables })
    else vote({ variables })
  }, [post, canVote, vote, unvote, t])
}
