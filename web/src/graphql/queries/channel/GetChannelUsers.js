import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'
import { useQuery } from 'urql'

export const GET_CHANNEL_USERS = gql`
  query GetChannelUsers($channelId: ID!) {
    getChannelUsers(channelId: $channelId) {
      role
      users {
        ...USER_FRAGMENT
      }
    }
  }
  ${USER_FRAGMENT}
`

export const useChannelUsersQuery = ({ channelId }) =>
  useQuery({ query: GET_CHANNEL_USERS, variables: { channelId } })
