import { gql } from '@urql/core'
import {
  POST_FRAGMENT,
  SERVER_FRAGMENT,
  USER_FRAGMENT
} from '@/graphql/fragments'

export default gql`
  query GetPost($postId: ID!) {
    getPost(postId: $postId) {
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
