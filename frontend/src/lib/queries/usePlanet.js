import { gql } from 'graphql-request'
import { useQuery } from 'react-query'
import { request } from '@/lib/network/request'

export const fetchPlanet = async ({ queryKey }, ctx = null) => {
  const [_key, variables] = queryKey

  const { planet } = await request(
    ctx,
    gql`
      query planet($name: String!) {
        planet(name: $name) {
          id
          name
          description
          color
          avatarUrl
          bannerUrl
          userCount
          isJoined
          timeSinceCreated
          galaxy
          banned
          banReason
          featured
          moderators {
            id
            username
            timeSinceCreated
            postCount
            commentCount
            bio
            avatarUrl
            bannerUrl
            isCurrentUser
          }
          users {
            id
            username
            timeSinceCreated
            postCount
            commentCount
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
  useQuery(['planet', variables], fetchPlanet, { refetchOnWindowFocus: true })
