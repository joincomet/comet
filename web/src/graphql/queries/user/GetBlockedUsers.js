import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'

export default gql`
  query GetBlockedUsers {
    getBlockedUsers {
      ...USER_FRAGMENT
    }
  }
  ${USER_FRAGMENT}
`
