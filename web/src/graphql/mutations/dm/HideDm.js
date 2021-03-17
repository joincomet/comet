import { gql } from '@urql/core'

export default gql`
  mutation HideDm($userId: ID!) {
    hideDm(userId: $userId)
  }
`
