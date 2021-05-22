import { useCallback } from 'react'
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

  return useCallback(() => {
    const input = { postId: post.id }
    if (post.isVoted)
      unvote({
        variables: { input }
      })
    else vote({ variables: { input } })
  }, [post, vote, unvote, t])
}
