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

  return user
}

export const useUser = variables => useQuery(['user', variables], fetchUser)
