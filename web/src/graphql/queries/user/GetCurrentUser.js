import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'
import { useQuery } from 'urql'

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      ...USER_FRAGMENT
      isAdmin
    }
  }
  ${USER_FRAGMENT}
`

export const useCurrentUserQuery = () => useQuery({ query: GET_CURRENT_USER })
