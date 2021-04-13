import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'

export const GET_REPLIES = gql`
  query GetReplies {
    getReplies {
      ...REPLY_FRAGMENT
    }
  }
  ${REPLY_FRAGMENT}
`
