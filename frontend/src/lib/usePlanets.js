import { gql } from 'graphql-request'
import { useQuery } from 'react-query'
import { request } from '@/lib/Request'

export const fetchPlanets = async ({ queryKey }, ctx = null) => {
  const [_key, variables] = queryKey
  const { planets } = await request(
    ctx,
    gql`
      query planets($sort: PlanetSort, $pageSize: Int, $joined: Boolean) {
        planets(sort: $sort, pageSize: $pageSize, joined: $joined) {
          id
          name
          avatarUrl
          userCount
        }
      }
    `,
    variables
  )
  return planets
}

export const usePlanets = variables =>
  useQuery(['planets', variables], fetchPlanets)
