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

const rocketComment = async variables => {
  await request(
    null,
    gql`
      mutation rocketComment($commentId: ID!) {
        rocketComment(commentId: $commentId)
      }
    `,
    variables
  )
}

export const useRocketCommentMutation = () => useMutation(rocketComment)

const unrocketComment = async variables => {
  await request(
    null,
    gql`
      mutation unrocketComment($commentId: ID!) {
        unrocketComment(commentId: $commentId)
      }
    `,
    variables
  )
}

export const useUnrocketCommentMutation = () => useMutation(unrocketComment)

const deleteComment = async variables => {
  await request(
    null,
    gql`
      mutation deleteComment($commentId: ID!) {
        deleteComment(commentId: $commentId)
      }
    `,
    variables
  )
}

export const useDeleteCommentMutation = () => useMutation(deleteComment)

const editComment = async variables => {
  await request(
    null,
    gql`
      mutation editComment($commentId: ID!, $newTextContent: String!) {
        editComment(commentId: $commentId, newTextContent: $newTextContent)
      }
    `,
    variables
  )
}

export const useEditCommentMutation = () => useMutation(editComment)
