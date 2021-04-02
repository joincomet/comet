import { gql } from '@urql/core'

export const REFETCH_GROUPS_AND_DMS = gql`
  subscription RefetchGroupsAndDms {
    refetchGroupsAndDms
  }
`
