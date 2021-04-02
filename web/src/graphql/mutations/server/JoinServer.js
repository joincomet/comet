import { gql } from '@urql/core'
import { useMutation } from 'urql'

export const JOIN_SERVER = gql`
  mutation JoinServer($serverId: ID!) {
    joinServer(serverId: $serverId)
  }
`

export const useJoinServerMutation = () => useMutation(JOIN_SERVER)
