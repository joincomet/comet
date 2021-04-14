import { gql } from '@urql/core'
import { REPLY_FRAGMENT } from '@/graphql/fragments'

export const REPLY_CHANGED = gql`
  subscription ReplyChanged {
    replyChanged {
      added {
        ...REPLY_FRAGMENT
      }
      updated {
        ...REPLY_FRAGMENT
      }
      deleted {
        ...REPLY_FRAGMENT
      }
    }
  }
  ${REPLY_FRAGMENT}
`
