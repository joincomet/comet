import { gql } from '@urql/core'
import { COMMENT_FRAGMENT } from '@/graphql/fragments'
import { useMutation } from 'urql'

export const CREATE_COMMENT_VOTE = gql`
  mutation CreateCommentVote($commentId: ID!) {
    createCommentVote(commentId: $commentId) {
      ...COMMENT_FRAGMENT
    }
  }
  ${COMMENT_FRAGMENT}
`

export const useCreateCommentVoteMutation = () =>
  useMutation(CREATE_COMMENT_VOTE)
