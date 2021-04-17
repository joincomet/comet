import { gql } from '@urql/core'

export const METADATA_FRAGMENT = gql`
  fragment METADATA_FRAGMENT on LinkMetadata {
    author
    date
    description
    image
    logo
    publisher
    title
    twitterCard
    url
  }
`

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
    createdAt
    updatedAt
    linkMetadatas {
      ...METADATA_FRAGMENT
    }
  }
  ${METADATA_FRAGMENT}
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
    createdAt
    updatedAt
    addedAt
    linkMetadata {
      ...METADATA_FRAGMENT
    }
    author {
      ...USER_FRAGMENT
    }
    server {
      ...SERVER_FRAGMENT
    }
  }
  ${METADATA_FRAGMENT}
  ${USER_FRAGMENT}
  ${SERVER_FRAGMENT}
`

export const MESSAGE_FRAGMENT = gql`
  fragment MESSAGE_FRAGMENT on Message {
    id
    text
    createdAt
    updatedAt
    type
    image {
      originalUrl
      popupUrl
      popupWidth
      popupHeight
      smallUrl
      smallWidth
      smallHeight
    }
    file {
      url
      mime
      filename
      size
    }
    linkMetadatas {
      ...METADATA_FRAGMENT
    }
    author {
      ...USER_FRAGMENT
    }
  }
  ${METADATA_FRAGMENT}
  ${USER_FRAGMENT}
`

export const FOLDER_FRAGMENT = gql`
  fragment FOLDER_FRAGMENT on Folder {
    id
    name
    avatarUrl
    description
    postCount
    followerCount
    isCollaborative
    visibility
  }
`

export const CHANNEL_FRAGMENT = gql`
  fragment CHANNEL_FRAGMENT on Channel {
    id
    name
    description
    isUnread
    mentionCount
  }
`

export const GROUP_FRAGMENT = gql`
  fragment GROUP_FRAGMENT on Group {
    id
    name
    displayName
    avatarUrl
    unreadCount
  }
`
export const REPLY_FRAGMENT = gql`
  fragment REPLY_FRAGMENT on Reply {
    id
    isRead
    comment {
      id
      parentComment {
        id
      }
      text
      voteCount
      author {
        ...USER_FRAGMENT
      }
      post {
        title
      }
    }
  }
  ${USER_FRAGMENT}
`
