import { gql } from '@urql/core'
import { REPLY_FRAGMENT } from '@/graphql/fragments'

export const REPLY_RECEIVED = gql`
  subscription ReplyReceived {
    replyReceived {
      ...REPLY_FRAGMENT
    }
  }
  ${REPLY_FRAGMENT}
`
