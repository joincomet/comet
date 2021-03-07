import { gql } from '@urql/core'

export default gql`
  mutation JoinServer($serverId: ID!) {
    joinServer(serverId: $serverId)
  }
`
