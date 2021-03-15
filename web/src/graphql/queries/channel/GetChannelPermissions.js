import { gql } from '@urql/core'

export default gql`
  query GetChannelPermissions($channelId: ID!) {
    getChannelPermissions(channelId: $channelId) {
      allowedPermissions
      deniedPermissions
    }
  }
`
