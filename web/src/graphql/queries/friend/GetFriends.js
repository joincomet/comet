import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'

export default gql`
  query GetFriends {
    getFriends {
      ...USER_FRAGMENT
    }
  }
  ${USER_FRAGMENT}
`
