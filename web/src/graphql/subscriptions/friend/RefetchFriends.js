import { gql } from '@urql/core'

export const REFETCH_FRIENDS = gql`
  subscription RefetchFriends {
    refetchFriends
  }
`
