import { gql } from 'graphql-request'
import { useQuery } from 'react-query'
import { request } from '@/lib/Request'

export const fetchUser = async ({ queryKey }, ctx = null) => {
  const [_key, variables] = queryKey

  const { user } = await request(
    ctx,
    gql`
      query user($username: String!) {
        user(username: $username) {
          id
          username
          name
          timeSinceCreated
          postCount
          commentCount
          followerCount
          followingCount
          bio
          avatarUrl
          bannerUrl
          isFollowing
          isFollowed
          isCurrentUser
        }
      }
    `,
    variables
  )

  return user
}

export const useUser = variables => useQuery(['user', variables], fetchUser)
