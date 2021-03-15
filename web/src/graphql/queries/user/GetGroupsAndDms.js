import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'

export default gql`
  query GetGroupsAndDms {
    getGroupsAndDms {
      ... on Group {
        name
        avatarUrl
        updatedAt
        id
        owner {
          id
        }
        users {
          ...USER_FRAGMENT
        }
      }
      ... on DirectMessage {
        updatedAt
        user1 {
          ...USER_FRAGMENT
        }
        user2 {
          ...USER_FRAGMENT
        }
      }
    }
  }
  ${USER_FRAGMENT}
`
