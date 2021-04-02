import { gql } from '@urql/core'
import { POST_FRAGMENT } from '@/graphql/fragments'
import { useMutation } from 'urql'

export const REMOVE_POST_VOTE = gql`
  mutation RemovePostVote($postId: ID!) {
    removePostVote(postId: $postId) {
      ...POST_FRAGMENT
    }
  }
  ${POST_FRAGMENT}
`

export const useRemovePostVoteMutation = () => useMutation(REMOVE_POST_VOTE)
