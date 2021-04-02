import { gql } from '@urql/core'

export const START_TYPING = gql`
  mutation StartTyping($channelId: ID, $groupId: ID, $userId: ID) {
    startTyping(channelId: $channelId, groupId: $groupId, userId: $userId)
  }
`
