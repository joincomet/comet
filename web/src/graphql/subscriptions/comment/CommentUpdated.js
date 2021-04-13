import { gql } from '@urql/core'
import { COMMENT_FRAGMENT, USER_FRAGMENT } from '@/graphql/fragments'

export const COMMENT_UPDATED = gql`
  subscription CommentUpdated {
    commentUpdated {
      ...COMMENT_FRAGMENT
      author {
        ...USER_FRAGMENT
      }
    }
  }
  ${COMMENT_FRAGMENT}
  ${USER_FRAGMENT}
`
