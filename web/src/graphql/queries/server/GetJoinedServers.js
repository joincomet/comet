import { gql } from '@urql/core'
import { SERVER_FRAGMENT } from '@/graphql/fragments'

export const GET_JOINED_SERVERS = gql`
  query GetJoinedServers {
    getJoinedServers {
      ...SERVER_FRAGMENT
    }
  }
  ${SERVER_FRAGMENT}
`
