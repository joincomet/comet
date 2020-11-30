import { gql, request } from 'graphql-request'
import { useInfiniteQuery, useQuery } from 'react-query'
import { ENDPOINT } from '@/Endpoint'

export const fetchPosts = async ({ queryKey, pageParam = 0 }) => {
  const [
    _key,
    { sort, time, universe, planet, galaxy, username, search }
  ] = queryKey
  const { posts } = await request(
    ENDPOINT(),
    gql`
        query Posts {
          posts(
            sort: ${sort || 'HOT'},
            page: ${pageParam},
            time: ${time || 'ALL'},
            universe: ${universe || false},
            planet: ${planet || null},
            galaxy: ${galaxy || null},
            username: ${username || null},
            search: ${search || null}
          ) {
            page
            nextPage,
            posts {
              id
              id36
              title
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
      `
  )
  return posts
}

export const usePosts = variables => {
  return useInfiniteQuery(['posts', variables], fetchPosts, {
    getNextPageParam: (lastPage, pages) => lastPage.nextPage
  })
}
