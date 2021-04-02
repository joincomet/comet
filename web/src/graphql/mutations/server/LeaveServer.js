import { gql } from '@urql/core'
import { useMutation } from 'urql'

export const LEAVE_SERVER = gql`
  mutation LeaveServer($serverId: ID!) {
    leaveServer(serverId: $serverId)
  }
`

export const useLeaveServerMutation = () => useMutation(LEAVE_SERVER)
