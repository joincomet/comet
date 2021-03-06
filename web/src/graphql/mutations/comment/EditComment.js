import { gql } from '@urql/core'

export default gql`
  mutation EditComment($newText: String!, $commentId: ID!) {
    editComment(newText: $newText, commentId: $commentId)
  }
`
