import { gql } from '@urql/core'
import { MESSAGE_FRAGMENT } from '@/graphql/fragments'

export default gql`
  subscription updateMessage($channelId: ID!) {
    updateMessage(channelId: $channelId) {
      ...MESSAGE_FRAGMENT
    }
  }
  ${MESSAGE_FRAGMENT}
`
