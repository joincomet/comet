import { gql } from '@urql/core'
import { CHANNEL_FRAGMENT } from '@/graphql/fragments'

export const CHANNEL_UPDATED = gql`
  subscription ChannelUpdated {
    channelUpdated {
      ...CHANNEL_FRAGMENT
    }
  }
  ${CHANNEL_FRAGMENT}
`
