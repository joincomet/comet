import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'
import { useQuery } from 'urql'

export const GET_USER_RELATIONSHIPS = gql`
  query GetUserRelationships {
    getUserRelationships {
      friends {
        ...USER_FRAGMENT
      }
      outgoingFriendRequests {
        ...USER_FRAGMENT
      }
      incomingFriendRequests {
        ...USER_FRAGMENT
      }
      blockingUsers {
        ...USER_FRAGMENT
      }
      blockedByUsers {
        id
      }
    }
  }
  ${USER_FRAGMENT}
`

export const useUserRelationshipsQuery = () =>
  useQuery({ query: GET_USER_RELATIONSHIPS })
