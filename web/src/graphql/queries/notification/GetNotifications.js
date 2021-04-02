import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'
import { useQuery } from 'urql'

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

export const useNotificationsQuery = ({ unreadOnly }) =>
  useQuery({ query: GET_NOTIFICATIONS, variables: { unreadOnly } })
