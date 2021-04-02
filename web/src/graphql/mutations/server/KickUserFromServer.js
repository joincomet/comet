import { gql } from '@urql/core'
import { useMutation } from 'urql'

export const KICK_USER_FROM_SERVER = gql`
  mutation KickUserFromServer($serverId: ID!, $userId: ID!) {
    kickUserFromServer(serverId: $serverId, userId: $userId)
  }
`

export const useKickUserFromServerMutation = () =>
  useMutation(KICK_USER_FROM_SERVER)
