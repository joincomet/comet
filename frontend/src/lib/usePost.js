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
          sticky
          textContent
          linkUrl
          imageUrls
          relativeUrl
          commentCount
          rocketCount
          rocketed
          repostCount
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
            profile {
              description
              color
            }
            avatarUrl
            bannerUrl
          }
          author {
            username
            name
            avatarUrl
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
