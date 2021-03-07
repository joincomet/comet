import { gql } from '@urql/core'

export default gql`
  mutation DeleteServer($serverId: ID!) {
    deleteServer(serverId: $serverId)
  }
`
