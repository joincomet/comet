import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'

export default gql`
  query GetFriendRequests {
    getFriendRequests {
      isOutgoing
      user {
        ...USER_FRAGMENT
      }
    }
  }
  ${USER_FRAGMENT}
`
