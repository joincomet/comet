import { gql } from '@urql/core'
import { useMutation } from 'urql'

export const START_TYPING = gql`
  mutation StartTyping($channelId: ID, $groupId: ID, $userId: ID) {
    startTyping(channelId: $channelId, groupId: $groupId, userId: $userId)
  }
`

export const useStartTypingMutation = () => useMutation(START_TYPING)
