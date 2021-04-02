import { gql } from '@urql/core'
import { COMMENT_FRAGMENT, USER_FRAGMENT } from '@/graphql/fragments'
import { useQuery } from 'urql'

export const GET_COMMENTS = gql`
  query GetComments($postId: ID!, $sort: GetCommentsSort) {
    getComments(postId: $postId, sort: $sort) {
      ...COMMENT_FRAGMENT
      author {
        ...USER_FRAGMENT
      }
    }
  }
  ${COMMENT_FRAGMENT}
  ${USER_FRAGMENT}
`

export const useCommentsQuery = ({ postId, sort }) =>
  useQuery({ query: GET_COMMENTS, variables: { postId, sort } })
