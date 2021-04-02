import { gql } from '@urql/core'
import { FOLDER_FRAGMENT } from '@/graphql/fragments'
import { useMutation } from 'urql'

export const CREATE_USER_FOLDER = gql`
  mutation CreateUserFolder($name: String!) {
    createUserFolder(name: $name) {
      ...FOLDER_FRAGMENT
    }
  }
  ${FOLDER_FRAGMENT}
`

export const useCreateUserFolderMutation = () => useMutation(CREATE_USER_FOLDER)
