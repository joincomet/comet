import { gql } from '@urql/core'
import {
  POST_FRAGMENT,
  SERVER_FRAGMENT,
  USER_FRAGMENT
} from '@/graphql/fragments'

export default gql`
  query GetPosts(
    $sort: GetPostsSort
    $page: Int
    $pageSize: Int
    $time: GetPostsTime
    $folderId: ID
    $serverId: ID
    $search: String
  ) {
    getPosts(
      sort: $sort
      page: $page
      pageSize: $pageSize
      time: $time
      folderId: $folderId
      serverId: $serverId
      search: $search
    ) {
      ...POST_FRAGMENT
      author {
        ...USER_FRAGMENT
      }
      server {
        ...SERVER_FRAGMENT
      }
    }
  }
  ${POST_FRAGMENT}
  ${USER_FRAGMENT}
  ${SERVER_FRAGMENT}
`
