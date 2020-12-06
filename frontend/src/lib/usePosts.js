import { gql } from 'graphql-request'
import { useInfiniteQuery } from 'react-query'
import { request } from '@/lib/Request'

export const fetchPosts = async ({ queryKey, pageParam = 0 }, ctx = null) => {
  const [_key, variables] = queryKey
  const { posts } = await request(
    ctx,
    gql`
      query posts(
        $sort: PostSort
        $page: Int
        $time: TimeFilter
        $universe: Boolean
        $planet: String
        $galaxy: String
        $username: String
        $search: String
      ) {
        posts(
          sort: $sort
          page: $page
          time: $time
          universe: $universe
          planet: $planet
          galaxy: $galaxy
          username: $username
          search: $search
        ) {
          page
          nextPage
          posts {
            id
            id36
            title
            sticky
            textContent
            linkURL
            imageURLs
            relativeURL
            commentCount
            rocketCount
            thumbnailURL
            logoURL
            domain
            meta {
              title
              description
            }
            planet {
              name
            }
            author {
              username
              avatarURL
            }
            timeSince
            timeSinceEdited
          }
        }
      }
    `,
    { ...variables, page: pageParam }
  )
  return posts
}

export const usePosts = variables =>
  useInfiniteQuery(['posts', variables], fetchPosts, {
    getNextPageParam: (lastPage, pages) => lastPage.nextPage
  })
