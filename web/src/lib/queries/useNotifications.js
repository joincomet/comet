import { useQuery, gql } from '@apollo/client'

const NOTIFICATIONS_QUERY = gql`
  query notifications($unreadOnly: Boolean) {
    notifications(unreadOnly: $unreadOnly) {
      id
      fromUser {
        id
        username
        avatarUrl
        bio
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
          bio
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

// TODO Notifications should use GraphQL subscriptions
