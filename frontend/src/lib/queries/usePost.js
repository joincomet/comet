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
          id36
          title
          pinned
          pinnedByAuthor
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
            name
            bio
            avatarUrl
            rocketCount
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
