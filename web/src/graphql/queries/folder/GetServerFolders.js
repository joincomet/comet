import { gql } from '@urql/core'
import { FOLDER_FRAGMENT, SERVER_FRAGMENT } from '@/graphql/fragments'

export const GET_SERVER_FOLDERS = gql`
  query GetServerFolders($serverId: ID!) {
    getServerFolders(serverId: $serverId) {
      ...FOLDER_FRAGMENT
      server {
        ...SERVER_FRAGMENT
      }
    }
  }
  ${FOLDER_FRAGMENT}
  ${SERVER_FRAGMENT}
`
