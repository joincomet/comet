import { gql } from '@urql/core'
import { POST_FRAGMENT } from '@/graphql/fragments'
import { useMutation } from 'urql'

export const CREATE_POST_VOTE = gql`
  mutation CreatePostVote($postId: ID!) {
    createPostVote(postId: $postId) {
      ...POST_FRAGMENT
    }
  }
  ${POST_FRAGMENT}
`

export const useCreatePostVoteMutation = () => useMutation(CREATE_POST_VOTE)
