import { request } from '@/lib/network/request'
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

export const useMutePlanetMutation = options => useMutation(mutePlanet, options)

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

export const useUnmutePlanetMutation = options =>
  useMutation(unmutePlanet, options)

const createPlanet = async variables => {
  await request(
    null,
    gql`
      mutation createPlanet(
        $name: String!
        $description: String!
        $galaxies: [Galaxy!]!
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

export const useCreatePlanetMutation = options =>
  useMutation(createPlanet, options)
