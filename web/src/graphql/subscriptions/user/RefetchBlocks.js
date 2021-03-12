import { gql } from '@urql/core'

export const REFETCH_BLOCKS = gql`
  subscription RefetchBlocks {
    refetchBlocks
  }
`
