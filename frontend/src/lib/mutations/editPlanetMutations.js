import { request } from '@/lib/network/request'
import { gql } from 'graphql-request'
import { useMutation } from 'react-query'

const uploadPlanetAvatar = async variables => {
  const { uploadPlanetAvatar } = await request(
    null,
    gql`
      mutation uploadPlanetAvatar($file: Upload!, $planetId: ID!) {
        uploadPlanetAvatar(file: $file, planetId: $planetId)
      }
    `,
    variables
  )
  return uploadPlanetAvatar
}

export const useUploadPlanetAvatarMutation = options =>
  useMutation(uploadPlanetAvatar, options)

const uploadPlanetBanner = async variables => {
  const { uploadPlanetBanner } = await request(
    null,
    gql`
      mutation uploadPlanetBanner($file: Upload!, $planetId: ID!) {
        uploadPlanetBanner(file: $file, planetId: $planetId)
      }
    `,
    variables
  )
  return uploadPlanetBanner
}

export const useUploadPlanetBannerMutation = options =>
  useMutation(uploadPlanetBanner, options)

const editPlanetDescription = async variables => {
  await request(
    null,
    gql`
      mutation editPlanetDescription($description: String!, $planetId: ID!) {
        editPlanetDescription(description: $description, planetId: $planetId)
      }
    `,
    variables
  )
}

export const useEditPlanetDescriptionMutation = options =>
  useMutation(editPlanetDescription, options)

const addModerator = async variables => {
  await request(
    null,
    gql`
      mutation addModerator($username: String!, $planetId: ID!) {
        addModerator(username: $username, planetId: $planetId)
      }
    `,
    variables
  )
}

export const useAddModeratorMutation = options =>
  useMutation(addModerator, options)

const setPlanetColor = async variables => {
  await request(
    null,
    gql`
      mutation setPlanetColor($planetId: ID!, $color: Color!) {
        setPlanetColor(planetId: $planetId, color: $color)
      }
    `,
    variables
  )
}

export const useSetPlanetColorMutation = options =>
  useMutation(setPlanetColor, options)

const setPlanetGalaxies = async variables => {
  await request(
    null,
    gql`
      mutation setPlanetGalaxies($planetId: ID!, $galaxies: [Galaxy!]!) {
        setPlanetGalaxies(planetId: $planetId, galaxies: $galaxies)
      }
    `,
    variables
  )
}

export const useSetPlanetGalaxiesMutation = options =>
  useMutation(setPlanetGalaxies, options)
