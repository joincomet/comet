import { gql } from '@urql/core'
import { CHANNEL_FRAGMENT, GROUP_FRAGMENT } from '@/graphql/fragments'

export const VIEW_GROUP = gql`
  mutation ViewGroup($groupId: ID!) {
    viewGroup(groupId: $groupId) {
      ...GROUP_FRAGMENT
    }
  }
  ${GROUP_FRAGMENT}
`
