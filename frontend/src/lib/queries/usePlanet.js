import { gql } from 'graphql-request'
import { useQuery } from 'react-query'
import { request } from '@/lib/Request'

export const fetchPlanet = async ({ queryKey }, ctx = null) => {
  const [_key, variables] = queryKey

  const { planet } = await request(
    ctx,
    gql`
      query planet($name: String!) {
        planet(name: $name) {
          id
          id36
          name
          description
          color
          avatarUrl
          bannerUrl
          userCount
          isJoined
          galaxies
          timeSinceCreated
          moderators {
            id
            username
            name
            avatarUrl
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
