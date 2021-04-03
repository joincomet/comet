import { gql } from '@urql/core'

export const USER_STARTED_TYPING = gql`
  subscription UserStartedTyping($channelId: ID, $groupId: ID, $userId: ID) {
    userStartedTyping(channelId: $channelId, groupId: $groupId, userId: $userId)
  }
`
