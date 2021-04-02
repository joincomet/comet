import { gql } from '@urql/core'
import { useSubscription } from 'urql'

export const REFETCH_SERVER_FOLDERS = gql`
  subscription RefetchServerFolders {
    refetchServerFolders
  }
`

export const useASubscription = refetchServerFolders =>
  useSubscription({ query: REFETCH_SERVER_FOLDERS }, () =>
    refetchServerFolders()
  )
