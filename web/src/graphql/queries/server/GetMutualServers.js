import { gql } from '@urql/core'
import { SERVER_FRAGMENT } from '@/graphql/fragments'

export const GET_MUTUAL_SERVERS = gql`
  query GetMutualServers($userId: ID!) {
    getMutualServers(userId: $userId) {
      ...SERVER_FRAGMENT
    }
  }
  ${SERVER_FRAGMENT}
`
