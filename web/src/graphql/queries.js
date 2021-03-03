import { gql } from '@urql/core'
import { useQuery, useSubscription } from 'urql'
import {
  COMMENT_FRAGMENT,
  MESSAGE_FRAGMENT,
  PLANET_FRAGMENT,
  POST_FRAGMENT,
  USER_FRAGMENT
} from '@/graphql/fragments'

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
      ...USER_FRAGMENT
      admin
    }
  }
  ${USER_FRAGMENT}
`

export const useCurrentUserQuery = () =>
  useQuery({ query: CURRENT_USER_QUERY, context: { suspense: false } })

export const COMMENTS_QUERY = gql`
  query comments($postId: ID!, $sort: CommentSort) {
    comments(postId: $postId, sort: $sort) {
      ...COMMENT_FRAGMENT
      author {
        ...USER_FRAGMENT
      }
    }
  }
  ${USER_FRAGMENT}
  ${COMMENT_FRAGMENT}
`

// TODO Notifications should use GraphQL subscriptions
export const NOTIFICATIONS_QUERY = gql`
  query notifications($unreadOnly: Boolean) {
    notifications(unreadOnly: $unreadOnly) {
      id
      fromUser {
        ...USER_FRAGMENT
      }
      post {
        id
        title
        planet {
          ...PLANET_FRAGMENT
        }
        author {
          ...USER_FRAGMENT
        }
      }
      comment {
        id
        parentCommentId
        textContent
        rocketCount
        author {
          ...USER_FRAGMENT
        }
      }
    }
  }
  ${USER_FRAGMENT}
  ${PLANET_FRAGMENT}
`

export const POST_QUERY = gql`
  query post($postId: ID!) {
    post(postId: $postId) {
      ...POST_FRAGMENT
    }
  }
  ${POST_FRAGMENT}
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
        ...POST_FRAGMENT
      }
    }
  }
  ${POST_FRAGMENT}
`

export const usePostsQuery = variables =>
  useQuery({ query: POSTS_QUERY, variables })

export const MESSAGES_QUERY = gql`
  query messages($channelId: ID!) {
    messages(channelId: $channelId) {
      messages {
        ...MESSAGE_FRAGMENT
      }
      page
      nextPage
    }
  }
  ${MESSAGE_FRAGMENT}
`

export const useMessagesQuery = variables =>
  useQuery({ query: MESSAGES_QUERY, variables })
