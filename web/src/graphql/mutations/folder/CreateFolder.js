import { gql } from '@urql/core'
import { FOLDER_FRAGMENT } from '@/graphql/fragments'

export const CREATE_FOLDER = gql`
  mutation CreateFolder($name: String!, $serverId: ID) {
    createFolder(name: $name, serverId: $serverId) {
      ...FOLDER_FRAGMENT
    }
  }
  ${FOLDER_FRAGMENT}
`
