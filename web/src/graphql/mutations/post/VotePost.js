import { gql } from '@urql/core'
import { POST_FRAGMENT } from '@/graphql/fragments'

export const VOTE_POST = gql`
  mutation VotePost($postId: ID!) {
    votePost(postId: $postId) {
      ...POST_FRAGMENT
    }
  }
  ${POST_FRAGMENT}
`
