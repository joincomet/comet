import { gql } from '@urql/core'
import { SERVER_FRAGMENT } from '@/graphql/fragments'

export const CREATE_SERVER = gql`
  mutation CreateServer($name: String!, $avatarFile: Upload) {
    createServer(name: $name, avatarFile: $avatarFile) {
      ...SERVER_FRAGMENT
    }
  }
  ${SERVER_FRAGMENT}
`
