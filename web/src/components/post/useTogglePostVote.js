import { useCallback } from 'react'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import toast from 'react-hot-toast'
import { ServerPermission } from '@/graphql/hooks'
import { useTranslation } from 'react-i18next'
import { useUnvotePostMutation, useVotePostMutation } from '@/graphql/hooks'

export const useTogglePostVote = post => {
  const { t } = useTranslation()
  const [vote] = useVotePostMutation({
    optimisticResponse: {
      votePost: {
        ...post,
        isVoted: true,
        voteCount: post.voteCount + 1
      }
    }
  })
  const [unvote] = useUnvotePostMutation({
    optimisticResponse: {
      unvotePost: {
        ...post,
        isVoted: false,
        voteCount: post.voteCount - 1
      }
    }
  })
  const [canVote] = useHasServerPermissions({
    serverId: post?.server.id,
    permissions: [ServerPermission.VotePost]
  })

  return useCallback(() => {
    const input = { postId: post.id }
    if (!canVote) {
      toast.error(t('post.context.votePermission'))
      return
    }
    if (post.isVoted)
      unvote({
        variables: { input }
      })
    else vote({ variables: { input } })
  }, [post, canVote, vote, unvote, t])
}
