import { gql, request } from 'graphql-request'
import { useQuery } from 'react-query'
import { ENDPOINT } from '@/Endpoint'

export const fetchPlanets = async (_, { sort, pageSize }) => {
  const { planets } = await request(
    ENDPOINT(),
    gql`
      query Planets {
        planets(
          sort: ${sort},
          pageSize: ${pageSize}
        ) {
          id
          name
          avatarURL
        }
      }
    `
  )
  return planets
}

export const usePlanets = variables => {
  return useQuery(['planets', variables], fetchPlanets)
}
