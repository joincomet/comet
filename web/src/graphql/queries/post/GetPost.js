import { gql } from '@urql/core'
import { POST_FRAGMENT, USER_FRAGMENT } from '@/graphql/fragments'

export default gql`
  query GetPost($postId: ID!) {
    getPost(postId: $postId) {
      ...POST_FRAGMENT
      author {
        ...USER_FRAGMENT
      }
    }
  }
  ${POST_FRAGMENT}
  ${USER_FRAGMENT}
`
