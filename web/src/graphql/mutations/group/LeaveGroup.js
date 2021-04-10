import { gql } from '@urql/core'
import { CHANNEL_FRAGMENT, GROUP_FRAGMENT } from '@/graphql/fragments'

export const LEAVE_GROUP = gql`
  mutation LeaveGroup($groupId: ID!) {
    leaveGroup(groupId: $groupId)
  }
  ${GROUP_FRAGMENT}
`
