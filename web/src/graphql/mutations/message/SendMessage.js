import { gql } from '@urql/core'
import { MESSAGE_FRAGMENT } from '@/graphql/fragments'

export const SEND_MESSAGE = gql`
  mutation SendMessage(
    $text: String
    $file: Upload
    $channelId: ID
    $groupId: ID
    $userId: ID
  ) {
    sendMessage(
      text: $text
      file: $file
      channelId: $channelId
      groupId: $groupId
      userId: $userId
    ) {
      ...MESSAGE_FRAGMENT
    }
  }
  ${MESSAGE_FRAGMENT}
`
