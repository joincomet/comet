import { gql } from '@urql/core'

export default gql`
  mutation RemovePost($postId: ID!, $reason: String) {
    removePost(postId: $postId, reason: $reason)
  }
`
