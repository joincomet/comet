import { gql } from '@urql/core'

export default gql`
  mutation VotePost($postId: ID!) {
    votePost(postId: $postId)
  }
`
