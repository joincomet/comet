import { gql } from '@urql/core'
import { CHANNEL_FRAGMENT } from '@/graphql/fragments'

export const CREATE_CHANNEL = gql`
  mutation CreateChannel($name: String!, $serverId: ID!, $isPrivate: Boolean) {
    createChannel(name: $name, serverId: $serverId, isPrivate: $isPrivate) {
      ...CHANNEL_FRAGMENT
    }
  }
  ${CHANNEL_FRAGMENT}
`
