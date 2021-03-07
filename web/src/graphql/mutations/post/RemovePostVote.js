import { gql } from '@urql/core'

export default gql`
  mutation RemovePostVote($postId: ID!) {
    removePostVote(postId: $postId)
  }
`
