import { request } from '@/lib/Request'
import { gql } from 'graphql-request'
import { useMutation } from 'react-query'

const leavePlanet = async variables => {
  const { login } = await request(
    null,
    gql`
      mutation leavePlanet($planetId: ID!) {
        leavePlanet(planetId: $planetId)
      }
    `,
    variables
  )
  return login
}

export const useLeavePlanetMutation = () => useMutation(leavePlanet)
