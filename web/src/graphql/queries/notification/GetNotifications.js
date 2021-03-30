import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'

export const GET_NOTIFICATIONS = gql`
  query GetNotifications($unreadOnly: Boolean) {
    getNotifications(unreadOnly: $unreadOnly) {
      id
      comment {
        id
        parentComment {
          id
        }
        text
        voteCount
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
