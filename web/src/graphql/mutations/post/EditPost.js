import { gql } from '@urql/core'
import { POST_FRAGMENT } from '@/graphql/fragments'
import { useMutation } from 'urql'

export const EDIT_POST = gql`
  mutation EditPost($text: String!, $postId: ID!) {
    editPost(text: $text, postId: $postId) {
      ...POST_FRAGMENT
    }
  }
  ${POST_FRAGMENT}
`

export const useEditPostMutation = () => useMutation(EDIT_POST)
