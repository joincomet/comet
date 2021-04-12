import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'

export const CHANGE_FRIEND_STATUS = gql`
  mutation ChangeFriendStatus($userId: ID!, $status: FriendStatus!) {
    changeFriendStatus(userId: $userId, status: $status) {
      ...USER_FRAGMENT
    }
  }
  ${USER_FRAGMENT}
`
