import { gql } from '@urql/core'
import { CHANNEL_FRAGMENT } from '@/graphql/fragments'
import { useMutation } from 'urql'

export const UPDATE_CHANNEL = gql`
  mutation UpdateChannel($channelId: ID!, $name: String, $description: String) {
    updateChannel(
      channelId: $channelId
      name: $name
      description: $description
    ) {
      ...CHANNEL_FRAGMENT
    }
  }
  ${CHANNEL_FRAGMENT}
`

export const useUpdateChannelMutation = () => useMutation(UPDATE_CHANNEL)
