import { gql } from '@urql/core'
import { GROUP_FRAGMENT, USER_FRAGMENT } from '@/graphql/fragments'
import { useQuery } from 'urql'

export const GET_GROUPS_AND_DMS = gql`
  query GetGroupsAndDms {
    getGroupsAndDms {
      ... on Group {
        __typename
        ...GROUP_FRAGMENT
        owner {
          id
        }
        users {
          ...USER_FRAGMENT
        }
      }
      ... on User {
        __typename
        ...USER_FRAGMENT
      }
    }
  }
  ${USER_FRAGMENT}
  ${GROUP_FRAGMENT}
`

export const useGroupsAndDmsQuery = () =>
  useQuery({ query: GET_GROUPS_AND_DMS })
