import { request } from '@/lib/network/request'
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

export const useUploadAvatarMutation = options =>
  useMutation(uploadAvatar, options)

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

export const useUploadBannerMutation = options =>
  useMutation(uploadBanner, options)

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

export const useEditBioMutation = options => useMutation(editBio, options)

const changePassword = async variables => {
  await request(
    null,
    gql`
      mutation changePassword($oldPassword: String!, $newPassword: String!) {
        changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
          accessToken
        }
      }
    `,
    variables
  )
}

export const useChangePasswordMutation = options =>
  useMutation(changePassword, options)
