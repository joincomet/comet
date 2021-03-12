import { gql } from '@urql/core'
import { MESSAGE_FRAGMENT, USER_FRAGMENT } from '@/graphql/fragments'

export const MESSAGE_RECEIVED = gql`
  subscription MessageReceived {
    messageReceived {
      ...MESSAGE_FRAGMENT
      author {
        ...USER_FRAGMENT
      }
    }
  }
  ${MESSAGE_FRAGMENT}
  ${USER_FRAGMENT}
`
