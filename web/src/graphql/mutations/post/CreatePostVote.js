import { gql } from '@urql/core'

export default gql`
  mutation CreatePostVote($postId: ID!) {
    createPostVote(postId: $postId)
  }
`
