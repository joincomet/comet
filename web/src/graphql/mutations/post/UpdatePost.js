import { gql } from '@urql/core'

export default gql`
  mutation UpdatePost($text: String!, $postId: ID!) {
    updatePost(text: $text, postId: $postId)
  }
`
