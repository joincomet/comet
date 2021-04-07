import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'

export const GET_MUTUAL_FRIENDS = gql`
  query GetMutualFriends($userId: ID!) {
    getMutualFriends(userId: $userId) {
      ...USER_FRAGMENT
    }
  }
  ${USER_FRAGMENT}
`
