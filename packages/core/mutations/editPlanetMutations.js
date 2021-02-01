import { request } from '../network/request'
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

const setPlanetGalaxy = async variables => {
  await request(
    null,
    gql`
      mutation setPlanetGalaxy($planetId: ID!, $galaxy: Galaxy!) {
        setPlanetGalaxy(planetId: $planetId, galaxy: $galaxy)
      }
    `,
    variables
  )
}

export const useSetPlanetGalaxyMutation = options =>
  useMutation(setPlanetGalaxy, options)
