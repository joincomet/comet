import { gql } from '@urql/core'
import { SERVER_FRAGMENT } from '@/graphql/fragments'

export const JOINED_SERVERS_UPDATED = gql`
  subscription JoinedServersUpdated {
    joinedServersUpdated {
      ...SERVER_FRAGMENT
    }
  }
  ${SERVER_FRAGMENT}
`
