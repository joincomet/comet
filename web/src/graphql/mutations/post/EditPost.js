import { gql } from '@urql/core'
import { POST_FRAGMENT } from '@/graphql/fragments'

export const EDIT_POST = gql`
  mutation EditPost($text: String!, $postId: ID!) {
    editPost(text: $text, postId: $postId) {
      ...POST_FRAGMENT
    }
  }
  ${POST_FRAGMENT}
`
