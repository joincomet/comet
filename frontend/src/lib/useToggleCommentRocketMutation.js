import { request } from '@/lib/Request'
import { gql } from 'graphql-request'
import { useMutation } from 'react-query'

const toggleCommentRocket = async variables => {
  const { toggleCommentRocket } = await request(
    null,
    gql`
      mutation toggleCommentRocket($commentId: ID!) {
        toggleCommentRocket(commentId: $commentId)
      }
    `,
    variables
  )
  return toggleCommentRocket
}

export const useToggleCommentRocketMutation = () =>
  useMutation(toggleCommentRocket)
