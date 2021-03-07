import { gql } from '@urql/core'

export default gql`
  mutation UpdateComment($text: String!, $commentId: ID!) {
    updateComment(text: $text, commentId: $commentId)
  }
`
