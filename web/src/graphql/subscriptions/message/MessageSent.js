import { gql } from '@urql/core'
import { MESSAGE_FRAGMENT, USER_FRAGMENT } from '@/graphql/fragments'

export const MESSAGE_SENT = gql`
  subscription MessageSent {
    messageSent {
      userId
      groupId
      channelId
      message {
        ...MESSAGE_FRAGMENT
        author {
          ...USER_FRAGMENT
        }
      }
    }
  }
  ${MESSAGE_FRAGMENT}
  ${USER_FRAGMENT}
`
