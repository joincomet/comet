import { gql } from '@urql/core'
import { MESSAGE_FRAGMENT, USER_FRAGMENT } from '@/graphql/fragments'

export default gql`
  query GetMessages(
    $channelId: ID
    $userId: ID
    $groupId: ID
    $pageSize: Int
    $page: Int
    $initialTime: DateTime
  ) {
    getMessages(
      channelId: $channelId
      userId: $userId
      groupId: $groupId
      pageSize: $pageSize
      page: $page
      initialTime: $initialTime
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
