import { gql } from '@urql/core'
import { CHANNEL_FRAGMENT } from '@/graphql/fragments'

export const VIEW_CHANNEL = gql`
  mutation ViewChannel($channelId: ID!) {
    viewChannel(channelId: $channelId) {
      ...CHANNEL_FRAGMENT
    }
  }
  ${CHANNEL_FRAGMENT}
`
