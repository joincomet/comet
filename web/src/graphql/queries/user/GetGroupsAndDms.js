import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'

export default gql`
  query GetGroupsAndDms {
    getGroupsAndDms {
      ... on Group {
        __typename
        id
        name
        avatarUrl
        updatedAt
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
