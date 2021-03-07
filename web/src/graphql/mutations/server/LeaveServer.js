import { gql } from '@urql/core'

export default gql`
  mutation LeaveServer($serverId: ID!) {
    leaveServer(serverId: $serverId)
  }
`
