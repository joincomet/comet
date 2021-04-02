import { gql } from '@urql/core'
import { useMutation } from 'urql'

export const DELETE_SERVER = gql`
  mutation DeleteServer($serverId: ID!) {
    deleteServer(serverId: $serverId)
  }
`

export const useDeleteServerMutation = () => useMutation(DELETE_SERVER)
