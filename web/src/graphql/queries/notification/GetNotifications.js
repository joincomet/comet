import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'

export default gql`
  query GetNotifications($unreadOnly: Boolean) {
    getNotifications(unreadOnly: $unreadOnly) {
      id
      comment {
        id
        parentCommentId
        text
        rocketCount
        author {
          ...USER_FRAGMENT
        }
        post {
          title
        }
      }
    }
  }
  ${USER_FRAGMENT}
`
