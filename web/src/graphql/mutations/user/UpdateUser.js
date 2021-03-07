import { gql } from '@urql/core'

export default gql`
  mutation UpdateUser($name: String, $avatarFile: Upload) {
    updateUser(name: $name, avatarFile: $avatarFile)
  }
`
