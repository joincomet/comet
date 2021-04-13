import { gql } from '@urql/core'
import { REPLY_FRAGMENT } from '@/graphql/fragments'

export const REPLY_READ = gql`
  subscription ReplyRead {
    replyRead {
      ...REPLY_FRAGMENT
    }
  }
  ${REPLY_FRAGMENT}
`
