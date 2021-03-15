import { gql } from '@urql/core'
import { SERVER_FRAGMENT } from '@/graphql/fragments'

export default gql`
  query GetServers(
    $sort: GetServersSort
    $category: ServerCategory
    $page: Int
    $pageSize: Int
  ) {
    getServers(
      sort: $sort
      category: $category
      page: $page
      pageSize: $pageSize
    ) {
      page
      nextPage
      servers {
        ...SERVER_FRAGMENT
      }
    }
  }
  ${SERVER_FRAGMENT}
`
