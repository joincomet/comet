import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'

export const GET_CURRENT_USER = gql`
  query GetCurrentUser @live {
    getCurrentUser {
      ...USER_FRAGMENT
      isAdmin
    }
  }
  ${USER_FRAGMENT}
`
