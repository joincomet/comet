import { gql } from '@urql/core'
import { POST_FRAGMENT } from '@/graphql/fragments'

export const UNPIN_POST = gql`
  mutation UnpinPost($postId: ID!) {
    unpinPost(postId: $postId) {
      ...POST_FRAGMENT
    }
  }
  ${POST_FRAGMENT}
`
