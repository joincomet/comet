import { gql } from 'graphql-request'
import { useQuery } from 'react-query'
import { request } from '@/lib/Request'

export const fetchPost = async ({ queryKey }, ctx = null) => {
  const [_key, variables] = queryKey

  const { post } = await request(
    ctx,
    gql`
      query post($postId: ID!) {
        post(postId: $postId) {
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
            id36
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
            id36
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
      }
    `,
    variables
  )

  return post
}

export const usePost = variables => useQuery(['post', variables], fetchPost)
