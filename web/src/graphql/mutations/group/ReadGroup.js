import { gql } from '@urql/core'
import { GROUP_FRAGMENT } from '@/graphql/fragments'

export const READ_GROUP = gql`
  mutation ReadGroup($groupId: ID!) {
    readGroup(groupId: $groupId) {
      ...GROUP_FRAGMENT
    }
  }
  ${GROUP_FRAGMENT}
`
