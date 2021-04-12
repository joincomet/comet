import { gql } from '@urql/core'

export const MESSAGE_DELETED = gql`
  subscription MessageDeleted {
    messageDeleted {
      userId
      groupId
      channelId
      messageId
    }
  }
`
