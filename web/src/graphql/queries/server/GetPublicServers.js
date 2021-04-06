import { gql } from '@urql/core'
import { SERVER_FRAGMENT } from '@/graphql/fragments'

export const GET_PUBLIC_SERVERS = gql`
  query GetPublicServers(
    $sort: GetPublicServersSort
    $category: ServerCategory
  ) {
    getPublicServers(sort: $sort, category: $category) {
      ...SERVER_FRAGMENT
      onlineUserCount
    }
  }
  ${SERVER_FRAGMENT}
`
