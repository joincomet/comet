import { gql } from '@urql/core'
import { FOLDER_FRAGMENT } from '@/graphql/fragments'

export const CREATE_SERVER_FOLDER = gql`
  mutation CreateServerFolder($name: String!, $serverId: ID!) {
    createServerFolder(name: $name, serverId: $serverId) {
      ...FOLDER_FRAGMENT
    }
  }
  ${FOLDER_FRAGMENT}
`
