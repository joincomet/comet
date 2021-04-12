import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'

export const GET_REPLIES = gql`
  query GetReplies {
    getReplies {
      id
      isRead
      comment {
        id
        parentComment {
          id
        }
        text
        voteCount
        author {
          ...USER_FRAGMENT
        }
        post {
          title
        }
      }
    }
  }
  ${USER_FRAGMENT}
`
