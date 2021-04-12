import { gql } from '@urql/core'

export const CLOSE_DM = gql`
  mutation CloseDm($userId: ID!) {
    closeDm(userId: $userId)
  }
`
