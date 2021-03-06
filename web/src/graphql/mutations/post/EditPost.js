import { gql } from '@urql/core'

export default gql`
  mutation EditPost($text: String!, $postId: ID!) {
    editPost(newText: text: $text, postId: $postId)
  }
`
