import { request } from '@/lib/Request'
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

export const useUploadPlanetAvatarMutation = () =>
  useMutation(uploadPlanetAvatar)

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

export const useUploadPlanetBannerMutation = () =>
  useMutation(uploadPlanetBanner)

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

export const useEditPlanetDescriptionMutation = () =>
  useMutation(editPlanetDescription)

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

export const useAddModeratorMutation = () => useMutation(addModerator)
