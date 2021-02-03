import { gql } from 'graphql-request'
import { useInfiniteQuery } from 'react-query'
import { request } from '../network/request'

export const fetchPosts = async ({ queryKey }) => {
  const [_key, variables] = queryKey
  const { posts } = await request(
    gql`
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
            id36
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
              isJoined
            }
            author {
              id
              username
              bio
              avatarUrl
              isCurrentUser
            }
            timeSince
            timeSinceFull
            timeSinceEdited
            createdAt
            editedAt
            deleted
            removed
            removedReason
          }
        }
      }
    `,
    variables
  )
  return posts
}

export const usePosts = variables =>
  useInfiniteQuery(['posts', variables], fetchPosts, {
    getNextPageParam: lastPage => lastPage.nextPage,
    hasNextPage: lastPage => !!lastPage.nextPage
  })
