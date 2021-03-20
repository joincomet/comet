import { gql } from '@urql/core'

export default gql`
  mutation UnpinPost($postId: ID!) {
    unpinPost(postId: $postId)
  }
`
