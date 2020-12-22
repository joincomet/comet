import { request } from '@/lib/Request'
import { gql } from 'graphql-request'
import { useMutation } from 'react-query'

const submitComment = async variables => {
  const { submitComment } = await request(
    null,
    gql`
      mutation submitComment(
        $textContent: String!
        $postId: ID!
        $parentCommentId: ID
      ) {
        submitComment(
          textContent: $textContent
          postId: $postId
          parentCommentId: $parentCommentId
        ) {
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
    `,
    variables
  )
  return submitComment
}

export const useSubmitCommentMutation = () => useMutation(submitComment)
