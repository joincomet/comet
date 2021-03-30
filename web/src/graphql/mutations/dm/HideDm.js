import { gql } from '@urql/core'

export const HIDE_DM = gql`
  mutation HideDm($userId: ID!) {
    hideDm(userId: $userId)
  }
`
