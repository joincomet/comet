import { gql } from '@urql/core'

export const REFETCH_USER_FOLDERS = gql`
  subscription RefetchUserFolders {
    refetchUserFolders
  }
`
