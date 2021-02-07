

import { useMutation, gql } from '@apollo/client'

const submitComment = async variables => {
  const { submitComment } = await request(
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
          parentCommentId
          textContent
          rocketCount
          isRocketed
          author {
            id
            username
            avatarUrl
            isCurrentUser
          }
          timeSince
          timeSinceEdited
          deleted
          removed
          removedReason
        }
      }
    `,
    variables
  )
  return submitComment
}

export const useSubmitCommentMutation = options =>
  useMutation(submitComment, options)

const rocketComment = async variables => {
  await request(
    gql`
      mutation rocketComment($commentId: ID!) {
        rocketComment(commentId: $commentId)
      }
    `,
    variables
  )
}

export const useRocketCommentMutation = options =>
  useMutation(rocketComment, options)

const unrocketComment = async variables => {
  await request(
    gql`
      mutation unrocketComment($commentId: ID!) {
        unrocketComment(commentId: $commentId)
      }
    `,
    variables
  )
}

export const useUnrocketCommentMutation = options =>
  useMutation(unrocketComment, options)

const deleteComment = async variables => {
  await request(
    gql`
      mutation deleteComment($commentId: ID!) {
        deleteComment(commentId: $commentId)
      }
    `,
    variables
  )
}

export const useDeleteCommentMutation = options =>
  useMutation(deleteComment, options)

const editComment = async variables => {
  await request(
    gql`
      mutation editComment($commentId: ID!, $newTextContent: String!) {
        editComment(commentId: $commentId, newTextContent: $newTextContent)
      }
    `,
    variables
  )
}

export const useEditCommentMutation = options =>
  useMutation(editComment, options)
