import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'

export const UPDATE_USER = gql`
  mutation UpdateUser($name: String, $avatarFile: Upload) {
    updateUser(name: $name, avatarFile: $avatarFile) {
      ...USER_FRAGMENT
    }
  }
  ${USER_FRAGMENT}
`
