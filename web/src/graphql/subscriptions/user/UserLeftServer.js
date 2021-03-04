import { gql } from '@urql/core'

export default gql`
  subscription UserLeftServer {
    userLeftServer {
      serverId
      userId
    }
  }
`
