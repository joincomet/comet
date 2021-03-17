import { gql } from '@urql/core'

export const REFETCH_SERVER_FOLDERS = gql`
  subscription RefetchServerFolders {
    refetchServerFolders
  }
`
