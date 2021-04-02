import { gql } from '@urql/core'
import { SERVER_FRAGMENT } from '@/graphql/fragments'
import { useQuery } from 'urql'

export const GET_PUBLIC_SERVERS = gql`
  query GetPublicServers(
    $sort: GetPublicServersSort
    $category: ServerCategory
    $page: Int
    $pageSize: Int
  ) {
    getPublicServers(
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

export const usePublicServersQuery = ({ sort, category, page, pageSize }) =>
  useQuery({
    query: GET_PUBLIC_SERVERS,
    variables: { sort, category, page, pageSize }
  })
