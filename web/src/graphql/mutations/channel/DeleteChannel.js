import { gql } from '@urql/core'
import { useMutation } from 'urql'

export const DELETE_CHANNEL = gql`
  mutation DeleteChannel($channelId: ID!) {
    deleteChannel(channelId: $channelId)
  }
`

export const useDeleteChannelMutation = () => useMutation(DELETE_CHANNEL)
