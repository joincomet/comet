import { gql } from '@urql/core'

export default gql`
  mutation PinPost($postId: ID!) {
    pinPost(postId: $postId)
  }
`
