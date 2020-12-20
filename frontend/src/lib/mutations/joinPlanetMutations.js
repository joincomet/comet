import { request } from '@/lib/Request'
import { gql } from 'graphql-request'
import { useMutation } from 'react-query'

const joinPlanet = async variables => {
  await request(
    null,
    gql`
      mutation joinPlanet($planetId: ID!) {
        joinPlanet(planetId: $planetId)
      }
    `,
    variables
  )
}

export const useJoinPlanetMutation = () => useMutation(joinPlanet)

const leavePlanet = async variables => {
  await request(
    null,
    gql`
      mutation leavePlanet($planetId: ID!) {
        leavePlanet(planetId: $planetId)
      }
    `,
    variables
  )
}

export const useLeavePlanetMutation = () => useMutation(leavePlanet)
