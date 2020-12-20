import { gql } from 'graphql-request'
import { useQuery } from 'react-query'
import { request } from '@/lib/Request'

export const fetchNotifications = async ({ queryKey }, ctx = null) => {
  const [_key, variables] = queryKey

  const { user } = await request(
    ctx,
    gql`
      query notifications($unreadOnly: Boolean) {
        notifications(unreadOnly: $unreadOnly) {
          id
          fromUser {
            id
            id36
            name
            username
            avatarUrl
            bio
          }
          post {
            id
            id36
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
              twitterCard
            }
            planet {
              id
              name
              description
              color
              avatarUrl
              bannerUrl
              isJoined
            }
            author {
              username
              name
              bio
              avatarUrl
              rocketCount
              followerCount
            }
            timeSince
            timeSinceEdited
          }
          comment {
            id
            id36
            parentCommentId
            textContent
            rocketCount
            author {
              username
              name
              avatarUrl
            }
            timeSince
            timeSinceEdited
          }
        }
      }
    `,
    variables
  )

  return user
}

export const useUser = variables => useQuery(['user', variables], fetchUser)
