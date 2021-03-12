import { gql } from '@urql/core'

export const REFETCH_FRIEND_REQUESTS = gql`
  subscription RefetchFriendRequests {
    refetchFriendRequests
  }
`
