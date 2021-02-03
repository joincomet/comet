import { gql } from 'graphql-request'
import { useQuery } from 'react-query'
import { request } from '../network/request'

export const fetchPost = async ({ queryKey }) => {
  const [_key, variables] = queryKey

  const { post } = await request(
    gql`
      query post($postId36: ID!) {
        post(postId36: $postId36) {
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
          }
          planet {
            id
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
          deleted
          removed
          removedReason
        }
      }
    `,
    variables
  )

  return post
}

export const usePost = variables => useQuery(['post', variables], fetchPost)
