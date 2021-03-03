import { gql } from '@urql/core'

export const USER_FRAGMENT = gql`
  fragment USER_FRAGMENT on User {
    id
    username
    name
    tag
    avatarUrl
    isCurrentUser
  }
`

export const PLANET_FRAGMENT = gql`
  fragment PLANET_FRAGMENT on Planet {
    id
    name
    description
    avatarUrl
    bannerUrl
    userCount
  }
`

export const COMMENT_FRAGMENT = gql`
  fragment COMMENT_FRAGMENT on Comment {
    id
    parentCommentId
    textContent
    rocketCount
    isRocketed
    deleted
    removed
    removedReason
    author {
      ...USER_FRAGMENT
    }
  }
  ${USER_FRAGMENT}
`

export const POST_FRAGMENT = gql`
  fragment POST_FRAGMENT on Post {
    id
    title
    pinned
    textContent
    linkUrl
    imageUrls
    relativeUrl
    commentCount
    rocketCount
    isRocketed
    thumbnailUrl
    logoUrl
    domain
    deleted
    removed
    removedReason
    meta {
      title
      description
    }
    author {
      ...USER_FRAGMENT
    }
    planet {
      ...PLANET_FRAGMENT
    }
  }
  ${USER_FRAGMENT}
  ${PLANET_FRAGMENT}
`

export const MESSAGE_FRAGMENT = gql`
  fragment MESSAGE_FRAGMENT on Message {
    id
    text
    createdAt
    editedAt
    author {
      ...USER_FRAGMENT
    }
  }
  ${USER_FRAGMENT}
`
