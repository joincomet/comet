import { gql } from '@urql/core'
import { POST_FRAGMENT } from '@/graphql/fragments'

export const REMOVE_POST_VOTE = gql`
  mutation RemovePostVote($postId: ID!) {
    removePostVote(postId: $postId) {
      ...POST_FRAGMENT
    }
  }
  ${POST_FRAGMENT}
`
