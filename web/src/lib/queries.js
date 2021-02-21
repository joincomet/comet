import { gql } from '@urql/core'
import { useQuery } from 'urql'

export const PLANETS_QUERY = gql`
  query planets(
    $sort: PlanetSort
    $joinedOnly: Boolean
    $galaxy: Galaxy
    $page: Int
    $pageSize: Int
  ) {
    planets(
      sort: $sort
      joinedOnly: $joinedOnly
      galaxy: $galaxy
      page: $page
      pageSize: $pageSize
    ) {
      page
      nextPage
      planets {
        id
        name
        avatarUrl
        bannerUrl
        userCount
        galaxy
        description
        featured
      }
    }
  }
`

export const usePlanetsQuery = variables =>
  useQuery({ query: PLANETS_QUERY, variables })

export const CURRENT_USER_QUERY = gql`
  query currentUser {
    currentUser {
      id
      admin
      username
      name
      username
      tag
      avatarUrl
      isOnline
      isCurrentUser
      folders {
        id
        name
      }
      groups {
        id
        name
        avatarUrl
        users {
          name
        }
      }
      planets {
        id
        name
        description
        avatarUrl
        channels {
          id
          name
          description
        }
        moderators {
          id
        }
      }
    }
  }
`

export const useCurrentUserQuery = () => useQuery({ query: CURRENT_USER_QUERY })

export const COMMENTS_QUERY = gql`
  query comments($postId: ID!, $sort: CommentSort) {
    comments(postId: $postId, sort: $sort) {
      id
      parentCommentId
      textContent
      rocketCount
      isRocketed
      author {
        id
        username
        status {
          expired
          status
        }
        avatarUrl
        isCurrentUser
      }
      deleted
      removed
      removedReason
    }
  }
`

// TODO Notifications should use GraphQL subscriptions
export const NOTIFICATIONS_QUERY = gql`
  query notifications($unreadOnly: Boolean) {
    notifications(unreadOnly: $unreadOnly) {
      id
      fromUser {
        id
        username
        avatarUrl
        isCurrentUser
      }
      post {
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
        meta {
          title
          description
        }
        planet {
          id
          name
          description
          avatarUrl
          bannerUrl
          userCount
        }
        author {
          id
          username
          avatarUrl
          isCurrentUser
        }
      }
      comment {
        id
        parentCommentId
        textContent
        rocketCount
        author {
          id
          username
          avatarUrl
          isCurrentUser
        }
      }
    }
  }
`

export const POST_QUERY = gql`
  query post($postId: ID!) {
    post(postId: $postId) {
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
      meta {
        title
        description
      }
      planet {
        id
        description
        avatarUrl
        bannerUrl
        userCount
      }
      author {
        id
        username
        avatarUrl
        isCurrentUser
      }
      deleted
      removed
      removedReason
    }
  }
`

export const POSTS_QUERY = gql`
  query posts(
    $sort: PostSort
    $page: Int
    $pageSize: Int
    $time: TimeFilter
    $joinedOnly: Boolean
    $planetId: ID
    $username: String
    $q: String
  ) {
    posts(
      sort: $sort
      page: $page
      pageSize: $pageSize
      time: $time
      joinedOnly: $joinedOnly
      planetId: $planetId
      username: $username
      q: $q
    ) {
      page
      nextPage
      posts {
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
        meta {
          title
          description
        }
        planet {
          id
          name
          description
          userCount
          avatarUrl
          bannerUrl
        }
        author {
          id
          username
          status {
            status
          }
          avatarUrl
          isCurrentUser
        }
        createdAt
        editedAt
        deleted
        removed
        removedReason
      }
    }
  }
`

export const usePostsQuery = variables =>
  useQuery({ query: POSTS_QUERY, variables })
