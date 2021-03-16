import { gql } from '@urql/core'

export default gql`
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
    )
  }
`
