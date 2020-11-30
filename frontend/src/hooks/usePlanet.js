import { gql, request } from 'graphql-request'
import { useQuery } from 'react-query'
import { ENDPOINT } from '@/Endpoint'

export const fetchPlanet = async ({ queryKey }) => {
  const [_key, { name }] = queryKey
  const { planet } = await request(
    ENDPOINT(),
    gql`
      query Planet {
        planet(
          name: "${name}"
        ) {
          id
          name
          profile {
            description
          }
          avatarURL
          bannerURL
        }
      }
    `
  )
  return planet
}

export const usePlanet = variables => {
  return useQuery(['planet', variables], fetchPlanet)
}
