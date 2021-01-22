import { gql } from 'graphql-request'
import { useQuery } from 'react-query'
import { request } from '@/lib/Request'

export const fetchNotifications = async ({ queryKey }, ctx = null) => {
  const [_key, variables] = queryKey

  const { notifications } = await request(
    ctx,
    gql`
      query notifications($unreadOnly: Boolean) {
        notifications(unreadOnly: $unreadOnly) {
          id
          timeSince
          parentCommentId
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
              color
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
              rocketCount
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

export const useNotifications = variables =>
  useQuery(['notifications', variables], fetchNotifications)
