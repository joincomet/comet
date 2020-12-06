import { gql } from 'graphql-request'
import { useQuery } from 'react-query'
import { request } from '@/lib/Request'

export const fetchComments = async ({ queryKey }, ctx = null) => {
  const [_key, variables] = queryKey

  const { comments } = await request(
    ctx,
    gql`
      query comments($postId: ID!) {
        comments(postId: $postId) {
          id
          id36
          parentCommentId
          textContent
          rocketCount
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

  return comments
}

export const useComments = variables =>
  useQuery(['comments', variables], fetchComments)
