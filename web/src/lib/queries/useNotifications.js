
import { useQuery, gql } from '@apollo/client'


export const fetchNotifications = async ({ queryKey }) => {
  const [_key, variables] = queryKey

  const { notifications } = await request(
    gql`
      query notifications($unreadOnly: Boolean) {
        notifications(unreadOnly: $unreadOnly) {
          id
          timeSince
          fromUser {
            id
            username
            avatarUrl
            bio
            isCurrentUser
          }
          post {
            id
            title
            pinned
            textContent
            linkUrl
            imageUrls
            relativeUrl
            commentCount
            rocketCount
            isRocketed
            thumbnailUrl
            logoUrl
            domain
            meta {
              title
              description
            }
            planet {
              id
              name
              description
              avatarUrl
              bannerUrl
              isJoined
              userCount
            }
            author {
              id
              username
              bio
              avatarUrl
              isCurrentUser
            }
            timeSince
            timeSinceFull
            timeSinceEdited
          }
          comment {
            id
            id36
            parentCommentId
            textContent
            rocketCount
            author {
              id
              username
              avatarUrl
              isCurrentUser
            }
            timeSince
            timeSinceFull
            timeSinceEdited
          }
        }
      }
    `,
    variables
  )

  return notifications
}

// TODO Notifications should use GraphQL subscriptions
export const useNotifications = variables =>
  useQuery(['notifications', variables], fetchNotifications)
