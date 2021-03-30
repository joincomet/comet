import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'

export const GET_GROUPS_AND_DMS = gql`
  query GetGroupsAndDms {
    getGroupsAndDms {
      ... on Group {
        __typename
        id
        name
        avatarUrl
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
`
