import { gql } from '@urql/core'
import { useSubscription } from 'urql'

export const MESSAGE_REMOVED = gql`
  subscription MessageRemoved {
    messageRemoved {
      userId
      groupId
      channelId
      messageId
    }
  }
`

export const useMessageRemovedSubscription = () =>
  useSubscription({ query: MESSAGE_REMOVED })
