import { gql } from '@urql/core'

export const LEAVE_SERVER = gql`
  mutation LeaveServer($serverId: ID!) {
    leaveServer(serverId: $serverId)
  }
`
