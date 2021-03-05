import { gql } from '@urql/core'
import { FOLDER_FRAGMENT } from '@/graphql/fragments'

export default gql`
  query GetServerFolders($serverId: ID!) {
    getServerFolders(serverId: $serverId) {
      ...FOLDER_FRAGMENT
    }
  }
  ${FOLDER_FRAGMENT}
`
