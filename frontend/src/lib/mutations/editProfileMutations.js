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

const changeName = async variables => {
  await request(
    null,
    gql`
      mutation changeName($name: String!) {
        changeName(name: $name)
      }
    `,
    variables
  )
}

export const useChangeNameMutation = () => useMutation(changeName)

const changeUsername = async variables => {
  await request(
    null,
    gql`
      mutation changeUsername($username: String!) {
        changeUsername(username: $username)
      }
    `,
    variables
  )
}

export const useChangeUsernameMutation = () => useMutation(changeUsername)

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

export const useChangePasswordMutation = () => useMutation(changePassword)
