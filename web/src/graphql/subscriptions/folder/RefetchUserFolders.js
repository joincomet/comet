import { gql } from '@urql/core'
import { useSubscription } from 'urql'

export const REFETCH_USER_FOLDERS = gql`
  subscription RefetchUserFolders {
    refetchUserFolders
  }
`

export const useRefetchUserFoldersSubscription = refetchUserFolders =>
  useSubscription({ query: REFETCH_USER_FOLDERS }, () => refetchUserFolders())
