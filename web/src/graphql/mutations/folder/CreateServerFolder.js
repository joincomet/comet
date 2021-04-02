import { gql } from '@urql/core'
import { FOLDER_FRAGMENT } from '@/graphql/fragments'
import { useMutation } from 'urql'

export const CREATE_SERVER_FOLDER = gql`
  mutation CreateServerFolder($name: String!, $serverId: ID!) {
    createServerFolder(name: $name, serverId: $serverId) {
      ...FOLDER_FRAGMENT
    }
  }
  ${FOLDER_FRAGMENT}
`

export const useCreateServerFolderMutation = () =>
  useMutation(CREATE_SERVER_FOLDER)
