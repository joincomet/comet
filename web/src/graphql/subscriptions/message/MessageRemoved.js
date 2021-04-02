import { gql } from '@urql/core'

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
