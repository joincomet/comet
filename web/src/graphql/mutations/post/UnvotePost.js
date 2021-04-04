import { gql } from '@urql/core'
import { POST_FRAGMENT } from '@/graphql/fragments'

export const UNVOTE_POST = gql`
  mutation UnvotePost($postId: ID!) {
    unvotePost(postId: $postId) {
      ...POST_FRAGMENT
    }
  }
  ${POST_FRAGMENT}
`
