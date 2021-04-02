import { gql } from '@urql/core'

export const CREATE_SERVER = gql`
  mutation CreateServer($name: String!, $avatarFile: Upload) {
    createServer(name: $name, avatarFile: $avatarFile) {
      id
    }
  }
`
