import { gql } from '@urql/core'

export const REFETCH_USER_RELATIONSHIPS = gql`
  subscription RefetchUserRelationships {
    refetchUserRelationships
  }
`
