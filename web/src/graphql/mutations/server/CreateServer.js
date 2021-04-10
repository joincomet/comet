import { gql } from '@urql/core'
import { SERVER_FRAGMENT } from '@/graphql/fragments'

export const CREATE_SERVER = gql`
  mutation CreateServer(
    $name: String!
    $avatarFile: Upload
    $isPublic: Boolean
  ) {
    createServer(name: $name, avatarFile: $avatarFile, isPublic: $isPublic) {
      ...SERVER_FRAGMENT
    }
  }
  ${SERVER_FRAGMENT}
`
