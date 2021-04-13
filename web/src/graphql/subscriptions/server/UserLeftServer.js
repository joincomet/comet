import { gql } from '@urql/core'

export const USER_LEFT_SERVER = gql`
  subscription UserLeftServer {
    userLeftServer {
      userId
      serverId
    }
  }
`
