import { gql } from '@urql/core'
import { GROUP_FRAGMENT, USER_FRAGMENT } from '@/graphql/fragments'

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
        unreadCount
      }
    }
  }
  ${USER_FRAGMENT}
  ${GROUP_FRAGMENT}
`
