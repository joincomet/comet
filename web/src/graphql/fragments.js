import { gql } from '@urql/core'

export const USER_FRAGMENT = gql`
  fragment USER_FRAGMENT on User {
    id
    username
    name
    tag
    avatarUrl
    isOnline
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
    isPublic
  }
`

export const COMMENT_FRAGMENT = gql`
  fragment COMMENT_FRAGMENT on Comment {
    id
    parentComment {
      id
    }
    text
    voteCount
    isVoted
    isDeleted
    isRemoved
    removedReason
    createdAt
    editedAt
  }
`

export const POST_FRAGMENT = gql`
  fragment POST_FRAGMENT on Post {
    id
    title
    isPinned
    text
    linkUrl
    imageUrls
    relativeUrl
    commentCount
    voteCount
    isVoted
    thumbnailUrl
    domain
    isDeleted
    isRemoved
    removedReason
    createdAt
    editedAt
    linkMetadata {
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

export const CHANNEL_FRAGMENT = gql`
  fragment CHANNEL_FRAGMENT on Channel {
    id
    name
    description
  }
`

export const GROUP_FRAGMENT = gql`
  fragment GROUP_FRAGMENT on Group {
    id
    name
    displayName
    avatarUrl
  }
`
