import { gql } from '@urql/core'
import { FOLDER_FRAGMENT } from '@/graphql/fragments'
import { useQuery } from 'urql'

export const GET_SERVER_FOLDERS = gql`
  query GetServerFolders($serverId: ID!) {
    getServerFolders(serverId: $serverId) {
      ...FOLDER_FRAGMENT
    }
  }
  ${FOLDER_FRAGMENT}
`

export const useServerFoldersQuery = ({ serverId }) =>
  useQuery({ query: GET_SERVER_FOLDERS, variables: { serverId } })
