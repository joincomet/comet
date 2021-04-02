import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'
import { useQuery } from 'urql'

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    getUser(userId: $userId) {
      ...USER_FRAGMENT
    }
  }
  ${USER_FRAGMENT}
`

export const useUserQuery = ({ userId }) =>
  useQuery({ query: GET_USER, variables: { userId } })
