import { gql } from '@urql/core'
import { MESSAGE_FRAGMENT, USER_FRAGMENT } from '@/graphql/fragments'

export default gql`
  query GetMessages(
    $channelId: ID
    $userId: ID
    $groupId: ID
    $page: Int
    $pageSize: Int
  ) {
    getMessages(
      channelId: $channelId
      userId: $userId
      groupId: $groupId
      page: $page
      pageSize: $pageSize
    ) {
      page
      nextPage
      messages {
        ...MESSAGE_FRAGMENT
        author {
          ...USER_FRAGMENT
        }
      }
    }
  }
  ${MESSAGE_FRAGMENT}
  ${USER_FRAGMENT}
`
