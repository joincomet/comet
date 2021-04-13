import { gql } from '@urql/core'
import { CHANNEL_FRAGMENT } from '@/graphql/fragments'

export const CHANNEL_READ = gql`
  subscription ChannelRead {
    channelRead
  }
  ${CHANNEL_FRAGMENT}
`
