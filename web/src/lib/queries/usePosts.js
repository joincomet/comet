import { gql, useQuery } from '@apollo/client'

const POSTS_QUERY = gql`
  query posts(
    $sort: PostSort
    $page: Int
    $pageSize: Int
    $time: TimeFilter
    $joinedOnly: Boolean
    $planet: String
    $username: String
    $q: String
  ) {
    posts(
      sort: $sort
      page: $page
      pageSize: $pageSize
      time: $time
      joinedOnly: $joinedOnly
      planet: $planet
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
          bio
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

export const usePosts = variables => {
  const { data } = useQuery(POSTS_QUERY, { variables })
  if (data && data.posts) return data.posts
  return null
}
