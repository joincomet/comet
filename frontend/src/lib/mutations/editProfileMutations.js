import { request } from '@/lib/Request'
import { gql } from 'graphql-request'
import { useMutation } from 'react-query'

const uploadAvatar = async variables => {
  const { uploadAvatar } = await request(
    null,
    gql`
      mutation uploadAvatar($file: Upload!) {
        uploadAvatar(file: $file)
      }
    `,
    variables
  )
  return uploadAvatar
}

export const useUploadAvatarMutation = () => useMutation(uploadAvatar)

const uploadBanner = async variables => {
  const { uploadBanner } = await request(
    null,
    gql`
      mutation uploadBanner($file: Upload!) {
        uploadBanner(file: $file)
      }
    `,
    variables
  )
  return uploadBanner
}

export const useUploadBannerMutation = () => useMutation(uploadBanner)

const editBio = async variables => {
  await request(
    null,
    gql`
      mutation editBio($bio: String!) {
        editBio(bio: $bio)
      }
    `,
    variables
  )
}

export const useEditBioMutation = () => useMutation(editBio)
