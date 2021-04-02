import { gql } from '@urql/core'
import { SERVER_FRAGMENT } from '@/graphql/fragments'
import { useQuery } from 'urql'

export const GET_JOINED_SERVERS = gql`
  query GetJoinedServers {
    getJoinedServers {
      ...SERVER_FRAGMENT
    }
  }
  ${SERVER_FRAGMENT}
`

export const useJoinedServersQuery = pause =>
  useQuery({ query: GET_JOINED_SERVERS, pause })
