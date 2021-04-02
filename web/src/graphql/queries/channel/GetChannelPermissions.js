import { gql } from '@urql/core'
import { useQuery } from 'urql'

export const GET_CHANNEL_PERMISSIONS = gql`
  query GetChannelPermissions($channelId: ID!) {
    getChannelPermissions(channelId: $channelId) {
      allowedPermissions
      deniedPermissions
    }
  }
`

export const useChannelPermissionsQuery = ({ channelId }) =>
  useQuery({ query: GET_CHANNEL_PERMISSIONS, variables: { channelId } })
