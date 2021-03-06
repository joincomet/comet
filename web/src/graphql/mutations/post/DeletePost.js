import { gql } from '@urql/core'

export default gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`
