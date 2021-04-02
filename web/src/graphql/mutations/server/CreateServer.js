import { gql } from '@urql/core'
import { useMutation } from 'urql'

export const CREATE_SERVER = gql`
  mutation CreateServer($name: String!, $avatarFile: Upload) {
    createServer(name: $name, avatarFile: $avatarFile) {
      id
    }
  }
`

export const useCreateServerMutation = () => useMutation(CREATE_SERVER)
