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
          linkURL
          imageURLs
          relativeURL
          commentCount
          rocketCount
          thumbnailURL
          logoURL
          domain
          meta {
            title
            description
          }
          planet {
            name
          }
          author {
            username
            avatarURL
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
