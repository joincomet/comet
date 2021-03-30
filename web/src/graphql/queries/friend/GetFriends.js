import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'

export const GET_FRIENDS = gql`
  query GetFriends {
    getFriends {
      ...USER_FRAGMENT
    }
  }
  ${USER_FRAGMENT}
`
