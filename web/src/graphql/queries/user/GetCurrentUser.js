import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'

export default gql`
  query GetCurrentUser {
    getCurrentUser {
      ...USER_FRAGMENT
      admin
    }
  }
  ${USER_FRAGMENT}
`
