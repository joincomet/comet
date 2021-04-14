import { gql } from '@urql/core'
import { MESSAGE_FRAGMENT } from '@/graphql/fragments'

export const CREATE_MESSAGE = gql`
  mutation CreateMessage(
    $text: String
    $file: Upload
    $channelId: ID
    $groupId: ID
    $userId: ID
  ) {
    createMessage(
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
