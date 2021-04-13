import { gql } from '@urql/core'
import { SERVER_FRAGMENT } from '@/graphql/fragments'

export const SERVER_UPDATED = gql`
  subscription ServerUpdated {
    serverUpdated {
      ...SERVER_FRAGMENT
    }
  }
  ${SERVER_FRAGMENT}
`
