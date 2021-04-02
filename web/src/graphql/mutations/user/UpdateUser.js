import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'
import { useMutation } from 'urql'

export const UPDATE_USER = gql`
  mutation UpdateUser($name: String, $avatarFile: Upload) {
    updateUser(name: $name, avatarFile: $avatarFile) {
      ...USER_FRAGMENT
    }
  }
  ${USER_FRAGMENT}
`

export const useUpdateUserMutation = () => useMutation(USER_FRAGMENT)
