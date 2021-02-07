
import { useQuery, gql } from '@apollo/client'


export const fetchPlanet = async ({ queryKey }) => {
  const [_key, variables] = queryKey

  const { planet } = await request(
    gql`
      query planet($name: String!) {
        planet(name: $name) {
          id
          name
          description
          avatarUrl
          bannerUrl
          userCount
          isJoined
          timeSince
          galaxy
          banned
          banReason
          featured
          moderators {
            id
            username
            timeSince
            bio
            avatarUrl
            bannerUrl
            isCurrentUser
          }
          users {
            id
            username
            timeSince
            bio
            avatarUrl
            bannerUrl
            isCurrentUser
          }
          channels {
            id
            name
          }
        }
      }
    `,
    variables
  )

  return planet
}

export const usePlanet = variables =>
  useQuery(['planet', variables], fetchPlanet)