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
    $joinedOnly: Boolean
    $serverId: ID
    $username: String
    $q: String
  ) {
    getPosts(
      sort: $sort
      page: $page
      pageSize: $pageSize
      time: $time
      joinedOnly: $joinedOnly
      serverId: $serverId
      username: $username
      q: $q
    ) {
      page
      nextPage
      posts {
        ...POST_FRAGMENT
        author {
          ...USER_FRAGMENT
        }
        server {
          ...SERVER_FRAGMENT
        }
      }
    }
  }
  ${POST_FRAGMENT}
  ${USER_FRAGMENT}
  ${SERVER_FRAGMENT}
`
