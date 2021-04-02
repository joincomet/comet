import { gql } from '@urql/core'
import { useMutation } from 'urql'

export const REMOVE_POST = gql`
  mutation RemovePost($postId: ID!, $reason: String) {
    removePost(postId: $postId, reason: $reason)
  }
`

export const useRemovePostMutation = () => useMutation(REMOVE_POST)
