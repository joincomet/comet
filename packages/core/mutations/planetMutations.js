import { request } from '../network/request'
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

export const useJoinPlanetMutation = options => useMutation(joinPlanet, options)

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

export const useLeavePlanetMutation = options =>
  useMutation(leavePlanet, options)

const createPlanet = async variables => {
  await request(
    null,
    gql`
      mutation createPlanet(
        $name: String!
        $description: String!
        $galaxy: Galaxy!
      ) {
        createPlanet(name: $name, description: $description, galaxy: $galaxy)
      }
    `,
    variables
  )
}

export const useCreatePlanetMutation = options =>
  useMutation(createPlanet, options)
