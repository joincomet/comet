import { gql } from '@urql/core'

export const REMOVE_POST = gql`
  mutation RemovePost($postId: ID!, $reason: String) {
    removePost(postId: $postId, reason: $reason)
  }
`
