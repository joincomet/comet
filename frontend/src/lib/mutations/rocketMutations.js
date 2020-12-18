import { request } from '@/lib/Request'
import { gql } from 'graphql-request'
import { useMutation } from 'react-query'

const rocketPost = async variables => {
  await request(
    null,
    gql`
      mutation rocketPost($postId: ID!) {
        rocketPost(postId: $postId)
      }
    `,
    variables
  )
}

export const useRocketPostMutation = () => useMutation(rocketPost)

const unrocketPost = async variables => {
  await request(
    null,
    gql`
      mutation unrocketPost($postId: ID!) {
        unrocketPost(postId: $postId)
      }
    `,
    variables
  )
}

export const useUnrocketPostMutation = () => useMutation(unrocketPost)

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
