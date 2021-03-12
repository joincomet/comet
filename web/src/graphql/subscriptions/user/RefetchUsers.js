import { gql } from '@urql/core'

export const REFETCH_USERS = gql`
  subscription RefetchUsers {
    refetchUsers
  }
`
