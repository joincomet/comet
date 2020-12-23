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

const mutePlanet = async variables => {
  await request(
    null,
    gql`
      mutation mutePlanet($planetId: ID!) {
        mutePlanet(planetId: $planetId)
      }
    `,
    variables
  )
}

export const useMutePlanetMutation = () => useMutation(mutePlanet)

const unmutePlanet = async variables => {
  await request(
    null,
    gql`
      mutation unmutePlanet($planetId: ID!) {
        unmutePlanet(planetId: $planetId)
      }
    `,
    variables
  )
}

export const useUnmutePlanetMutation = () => useMutation(unmutePlanet)

const createPlanet = async variables => {
  await request(
    null,
    gql`
      mutation createPlanet(
        $name: String!
        $description: String!
        $galaxies: [String!]!
      ) {
        createPlanet(
          name: $name
          description: $description
          galaxies: $galaxies
        )
      }
    `,
    variables
  )
}

export const useCreatePlanetMutation = () => useMutation(createPlanet)
