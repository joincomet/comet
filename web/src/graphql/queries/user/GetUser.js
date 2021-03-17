import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'

export default gql`
  query GetUser($userId: ID!) {
    getUser(userId: $userId) {
      ...USER_FRAGMENT
    }
  }
  ${USER_FRAGMENT}
`
