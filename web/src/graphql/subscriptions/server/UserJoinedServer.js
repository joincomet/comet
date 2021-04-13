import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'

export const USER_JOINED_SERVER = gql`
  subscription UserJoinedServer {
    userJoinedServer {
      user {
        ...USER_FRAGMENT
      }
      serverId
    }
  }
  ${USER_FRAGMENT}
`
