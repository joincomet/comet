import { gql } from '@urql/core'
import { POST_FRAGMENT } from '@/graphql/fragments'

export const CREATE_POST_VOTE = gql`
  mutation CreatePostVote($postId: ID!) {
    createPostVote(postId: $postId) {
      ...POST_FRAGMENT
    }
  }
  ${POST_FRAGMENT}
`
