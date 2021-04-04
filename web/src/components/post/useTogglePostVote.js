import { useCallback } from 'react'
import { useMutation } from 'urql'
import { UNVOTE_POST, VOTE_POST } from '@/graphql/mutations'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import toast from 'react-hot-toast'
import { ServerPermission } from '@/types/ServerPermission'
import { useTranslation } from 'react-i18next'

export const useTogglePostVote = post => {
  const { t } = useTranslation()
  const [_voteRes, vote] = useMutation(VOTE_POST)
  const [_unvoteRes, unvote] = useMutation(UNVOTE_POST)
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
