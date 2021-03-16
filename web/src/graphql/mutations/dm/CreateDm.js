import { gql } from '@urql/core'

export default gql`
  mutation CreateDm($userId: ID!) {
    createDm(userId: $userId)
  }
`
