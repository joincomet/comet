import { gql } from '@urql/core'

export default gql`
  mutation CreateServer($name: String!, $avatarFile: Upload) {
    createServer(name: $name, avatarFile: $avatarFile) {
      id
    }
  }
`
