import { gql } from '@urql/core'
import { useSubscription } from 'urql'

export const REFETCH_GROUPS_AND_DMS = gql`
  subscription RefetchGroupsAndDms {
    refetchGroupsAndDms
  }
`

export const useRefetchGroupsAndDmsSubscription = refetchGroupsAndDms =>
  useSubscription({ query: REFETCH_GROUPS_AND_DMS }, () =>
    refetchGroupsAndDms()
  )
