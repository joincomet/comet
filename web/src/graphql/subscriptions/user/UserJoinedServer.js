import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'

export default gql`
  subscription UserJoinedServer {
    userJoinedServer {
      serverId
      user {
        ...USER_FRAGMENT
      }
    }
  }
  ${USER_FRAGMENT}
`
