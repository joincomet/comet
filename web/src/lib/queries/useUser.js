
import { useQuery, gql } from '@apollo/client'


export const fetchUser = async ({ queryKey }) => {
  const [_key, variables] = queryKey

  const { user } = await request(
    gql`
      query user($username: String!) {
        user(username: $username) {
          id
          username
          timeSince
          isOnline
          bio
          avatarUrl
          bannerUrl
          isCurrentUser
          banned
          banReason
        }
      }
    `,
    variables
  )

  return user
}

export const useUser = variables => useQuery(['user', variables], fetchUser)