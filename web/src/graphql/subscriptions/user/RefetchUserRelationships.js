import { gql } from '@urql/core'
import { useSubscription } from 'urql'

export const REFETCH_USER_RELATIONSHIPS = gql`
  subscription RefetchUserRelationships {
    refetchUserRelationships
  }
`

export const useRefetchUserRelationshipsSubscription = refetchUserRelationships =>
  useSubscription({ query: REFETCH_USER_RELATIONSHIPS }, () =>
    refetchUserRelationships()
  )
