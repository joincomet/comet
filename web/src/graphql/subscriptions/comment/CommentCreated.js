import { gql } from '@urql/core'
import { COMMENT_FRAGMENT, USER_FRAGMENT } from '@/graphql/fragments'

export const COMMENT_CREATED = gql`
  subscription CommentCreated {
    commentCreated {
      postId
      comment {
        ...COMMENT_FRAGMENT
        author {
          ...USER_FRAGMENT
        }
      }
    }
  }
  ${COMMENT_FRAGMENT}
  ${USER_FRAGMENT}
`
