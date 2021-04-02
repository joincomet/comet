import { gql } from '@urql/core'
import { useMutation } from 'urql'

export const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`

export const useDeletePostMutation = () => useMutation(DELETE_POST)
