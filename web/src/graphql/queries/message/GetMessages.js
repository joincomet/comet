import { gql } from '@urql/core'
import { MESSAGE_FRAGMENT, USER_FRAGMENT } from '@/graphql/fragments'

export default gql`
  query GetMessages(
    $channelId: ID
    $userId: ID
    $groupId: ID
    $limit: Int
    $lastMessageId: ID
  ) {
    getMessages(
      channelId: $channelId
      userId: $userId
      groupId: $groupId
      limit: $limit
      lastMessageId: $lastMessageId
    ) {
      ...MESSAGE_FRAGMENT
      author {
        ...USER_FRAGMENT
      }
    }
  }
  ${MESSAGE_FRAGMENT}
  ${USER_FRAGMENT}
`
