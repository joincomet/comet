import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'

export const DM_OPENED = gql`
  subscription DmOpened {
    dmOpened {
      ...USER_FRAGMENT
    }
  }
  ${USER_FRAGMENT}
`
