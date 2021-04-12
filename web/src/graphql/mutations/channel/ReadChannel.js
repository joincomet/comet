import { gql } from '@urql/core'
import { CHANNEL_FRAGMENT } from '@/graphql/fragments'

export const READ_CHANNEL = gql`
  mutation ReadChannel($channelId: ID!) {
    readChannel(channelId: $channelId) {
      ...CHANNEL_FRAGMENT
    }
  }
  ${CHANNEL_FRAGMENT}
`
