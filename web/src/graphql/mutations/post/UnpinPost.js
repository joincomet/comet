import { gql } from '@urql/core'
import { POST_FRAGMENT } from '@/graphql/fragments'
import { useMutation } from 'urql'

export const UNPIN_POST = gql`
  mutation UnpinPost($postId: ID!) {
    unpinPost(postId: $postId) {
      ...POST_FRAGMENT
    }
  }
  ${POST_FRAGMENT}
`

export const useUnpinPostMutation = () => useMutation(UNPIN_POST)
