import { gql } from '@urql/core'
import { POST_FRAGMENT } from '@/graphql/fragments'

export const PIN_POST = gql`
  mutation PinPost($postId: ID!) {
    pinPost(postId: $postId) {
      ...POST_FRAGMENT
    }
  }
  ${POST_FRAGMENT}
`
