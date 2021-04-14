import { gql } from '@urql/core'
import { POST_FRAGMENT } from '@/graphql/fragments'

export const UPDATE_POST = gql`
  mutation UpdatePost($text: String!, $postId: ID!) {
    updatePost(text: $text, postId: $postId) {
      ...POST_FRAGMENT
    }
  }
  ${POST_FRAGMENT}
`
