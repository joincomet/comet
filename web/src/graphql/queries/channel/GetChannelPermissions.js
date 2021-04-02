import { gql } from '@urql/core'

export const GET_CHANNEL_PERMISSIONS = gql`
  query GetChannelPermissions($channelId: ID!) {
    getChannelPermissions(channelId: $channelId) {
      allowedPermissions
      deniedPermissions
    }
  }
`
