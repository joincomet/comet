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
            name
            username
            avatarUrl
            bio
            isCurrentUser
            followerCount
            followingCount
            isFollowing
            isFollowed
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
              userCount
            }
            author {
              id
              username
              name
              bio
              avatarUrl
              rocketCount
              followerCount
              followingCount
              isFollowing
              isFollowed
              isCurrentUser
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
              id
              username
              name
              avatarUrl
              followerCount
              followingCount
              isFollowing
              isFollowed
              isCurrentUser
            }
            timeSince
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
