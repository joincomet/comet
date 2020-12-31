import { gql } from 'graphql-request'
import { useQuery } from 'react-query'
import { request } from '@/lib/Request'

export const fetchPosts = async ({ queryKey }, ctx = null) => {
  const [_key, variables] = queryKey
  const { posts } = await request(
    ctx,
    gql`
      query posts(
        $sort: PostSort
        $page: Int
        $time: TimeFilter
        $joinedOnly: Boolean
        $planet: String
        $galaxy: String
        $username: String
        $q: String
      ) {
        posts(
          sort: $sort
          page: $page
          time: $time
          joinedOnly: $joinedOnly
          planet: $planet
          galaxy: $galaxy
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
            pinnedByAuthor
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
              color
              userCount
              avatarUrl
              isJoined
            }
            author {
              id
              username
              name
              bio
              avatarUrl
              followerCount
              followingCount
              isFollowing
              isFollowed
              isCurrentUser
            }
            timeSince
            timeSinceEdited
            deleted
            removed
            removedReason
            repostId
            repost {
              id
              id36
              title
              pinned
              pinnedByAuthor
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
                color
                avatarUrl
                bannerUrl
                isJoined
                userCount
              }
              author {
                id
                username
                name
                bio
                avatarUrl
                rocketCount
                followerCount
                followingCount
                isFollowing
                isFollowed
                isCurrentUser
              }
              timeSince
              timeSinceEdited
              deleted
              removed
              removedReason
            }
          }
        }
      }
    `,
    variables
  )
  return posts
}

export const usePosts = variables => useQuery(['posts', variables], fetchPosts)
