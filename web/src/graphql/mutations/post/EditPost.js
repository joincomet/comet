import { gql } from '@urql/core'

export default gql`
  mutation EditPost($text: String!, $postId: ID!) {
    editPost(text: $text, postId: $postId)
  }
`
