import { gql } from '@urql/core'
import { FOLDER_FRAGMENT } from '@/graphql/fragments'
import { useQuery } from 'urql'

export const GET_USER_FOLDERS = gql`
  query GetUserFolders {
    getUserFolders {
      ...FOLDER_FRAGMENT
    }
  }
  ${FOLDER_FRAGMENT}
`

export const useUserFoldersQuery = () => useQuery({ query: GET_USER_FOLDERS })
