import { gql } from '@urql/core'
import { CHANNEL_FRAGMENT, SERVER_FRAGMENT } from '@/graphql/fragments'

export const GET_JOINED_SERVERS = gql`
  query GetJoinedServers {
    getJoinedServers {
      ...SERVER_FRAGMENT
      channels {
        ...CHANNEL_FRAGMENT
      }
    }
  }
  ${SERVER_FRAGMENT}
  ${CHANNEL_FRAGMENT}
`
