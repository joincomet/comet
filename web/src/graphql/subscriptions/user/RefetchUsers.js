import { gql } from '@urql/core'
import { useSubscription } from 'urql'

export const REFETCH_USERS = gql`
  subscription RefetchUsers {
    refetchUsers
  }
`

export const useRefetchUsersSubscription = refetchUsers =>
  useSubscription({ query: REFETCH_USERS }, () => refetchUsers())
