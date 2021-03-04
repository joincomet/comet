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

export const SERVER_FRAGMENT = gql`
  fragment SERVER_FRAGMENT on Server {
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
    text
    rocketCount
    isRocketed
    deleted
    removed
    removedReason
  }
`

export const POST_FRAGMENT = gql`
  fragment POST_FRAGMENT on Post {
    id
    title
    pinned
    text
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
  }
`

export const MESSAGE_FRAGMENT = gql`
  fragment MESSAGE_FRAGMENT on Message {
    id
    text
    createdAt
    editedAt
  }
`

export const FOLDER_FRAGMENT = gql`
  fragment FOLDER_FRAGMENT on Folder {
    id
    name
    avatarUrl
    description
  }
`
