import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'

export const EDIT_ACCOUNT = gql`
  mutation EditAccount($name: String, $avatarFile: Upload) {
    editAccount(name: $name, avatarFile: $avatarFile) {
      ...USER_FRAGMENT
    }
  }
  ${USER_FRAGMENT}
`
