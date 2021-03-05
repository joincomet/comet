import { gql } from '@urql/core'
import { SERVER_FRAGMENT } from '@/graphql/fragments'

export default gql`
  query GetJoinedServers {
    getJoinedServers {
      ...SERVER_FRAGMENT
    }
  }
  ${SERVER_FRAGMENT}
`
