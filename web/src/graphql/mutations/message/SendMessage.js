import { gql } from '@urql/core'
import { MESSAGE_FRAGMENT } from '@/graphql/fragments'

export const SEND_MESSAGE = gql`
  mutation SendMessage(
    $text: String!
    $channelId: ID
    $groupId: ID
    $userId: ID
  ) {
    sendMessage(
      text: $text
      channelId: $channelId
      groupId: $groupId
      userId: $userId
    ) {
      ...MESSAGE_FRAGMENT
    }
  }
  ${MESSAGE_FRAGMENT}
`
