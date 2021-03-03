import { gql } from '@urql/core'
import { useMutation } from 'urql'
import { COMMENT_FRAGMENT, USER_FRAGMENT } from '@/graphql/fragments'

export const SUBMIT_COMMENT_MUTATION = gql`
  mutation submitComment(
    $textContent: String!
    $postId: ID!
    $parentCommentId: ID
  ) {
    submitComment(
      textContent: $textContent
      postId: $postId
      parentCommentId: $parentCommentId
    ) {
      ...COMMENT_FRAGMENT
    }
  }
  ${COMMENT_FRAGMENT}
`

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId)
  }
`

export const EDIT_COMMENT_MUTATION = gql`
  mutation editComment($commentId: ID!, $newTextContent: String!) {
    editComment(commentId: $commentId, newTextContent: $newTextContent)
  }
`

export const ROCKET_COMMENT_MUTATION = gql`
  mutation rocketComment($commentId: ID!) {
    rocketComment(commentId: $commentId)
  }
`

export const UNROCKET_COMMENT_MUTATION = gql`
  mutation unrocketComment($commentId: ID!) {
    unrocketComment(commentId: $commentId)
  }
`

export const CREATE_CHANNEL_MUTATION = gql`
  mutation createChannel($name: String!, $planetId: ID!, $modOnly: Boolean) {
    createChannel(name: $name, planetId: $planetId, modOnly: $modOnly) {
      id
    }
  }
`

export const useCreateChannelMutation = () =>
  useMutation(CREATE_CHANNEL_MUTATION)

export const CREATE_PLANET_MUTATION = gql`
  mutation createPlanet($name: String!, $avatarFile: Upload) {
    createPlanet(name: $name, avatarFile: $avatarFile) {
      id
    }
  }
`

export const useCreatePlanetMutation = () => useMutation(CREATE_PLANET_MUTATION)

export const UPLOAD_AVATAR_MUTATION = gql`
  mutation uploadAvatar($file: Upload!) {
    uploadAvatar(file: $file)
  }
`

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation changePassword($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      accessToken
    }
  }
`

export const UPLOAD_PLANET_AVATAR_MUTATION = gql`
  mutation uploadPlanetAvatar($file: Upload!, $planetId: ID!) {
    uploadPlanetAvatar(file: $file, planetId: $planetId)
  }
`

export const UPLOAD_PLANET_BANNER_MUTATION = gql`
  mutation uploadPlanetBanner($file: Upload!, $planetId: ID!) {
    uploadPlanetBanner(file: $file, planetId: $planetId)
  }
`

export const EDIT_PLANET_DESCRIPTION_MUTATION = gql`
  mutation editPlanetDescription($description: String!, $planetId: ID!) {
    editPlanetDescription(description: $description, planetId: $planetId)
  }
`

export const ADD_MOD_MUTATION = gql`
  mutation addModerator($username: String!, $planetId: ID!) {
    addModerator(username: $username, planetId: $planetId)
  }
`

export const SET_GALAXY_MUTATION = gql`
  mutation setPlanetGalaxy($planetId: ID!, $galaxy: Galaxy!) {
    setPlanetGalaxy(planetId: $planetId, galaxy: $galaxy)
  }
`

export const REMOVE_POST_MUTATION = gql`
  mutation removePost($postId: ID!, $reason: String!) {
    removePost(postId: $postId, reason: $reason)
  }
`

export const REMOVE_COMMENT_MUTATION = gql`
  mutation removeComment($commentId: ID!, $reason: String!) {
    removeComment(commentId: $commentId, reason: $reason)
  }
`

export const BAN_USER_PLANET_MUTATION = gql`
  mutation banUserFromPlanet($planetId: ID!, $bannedId: ID!) {
    banUserFromPlanet(planetId: $planetId, bannedId: $bannedId)
  }
`

export const BAN_USER_GLOBAL_MUTATION = gql`
  mutation banUser($bannedId: ID!, $reason: String!) {
    banUser(bannedId: $bannedId, reason: $reason)
  }
`

export const BAN_PURGE_GLOBAL_MUTATION = gql`
  mutation banAndPurgeUser($bannedId: ID!, $reason: String!) {
    banAndPurgeUser(bannedId: $bannedId, reason: $reason)
  }
`

export const MARK_NOTIF_READ_MUTATION = gql`
  mutation markNotificationRead($id: ID!) {
    markNotificationRead(id: $id)
  }
`

export const MARK_ALL_NOTIFS_READ_MUTATION = gql`
  mutation markAllNotificationsRead {
    markAllNotificationsRead
  }
`

export const JOIN_PLANET_MUTATION = gql`
  mutation joinPlanet($planetId: ID!) {
    joinPlanet(planetId: $planetId)
  }
`

export const LEAVE_PLANET_MUTATION = gql`
  mutation leavePlanet($planetId: ID!) {
    leavePlanet(planetId: $planetId)
  }
`

export const SUBMIT_POST_MUTATION = gql`
  mutation submitPost(
    $title: String
    $linkUrl: String
    $textContent: String
    $planetId: ID!
    $images: [Upload!]
  ) {
    submitPost(
      title: $title
      linkUrl: $linkUrl
      textContent: $textContent
      planetId: $planetId
      images: $images
    ) {
      id
      relativeUrl
    }
  }
`

export const PIN_POST_MUTATION = gql`
  mutation pinPost($postId: ID!) {
    pinPost(postId: $postId)
  }
`

export const UNPIN_POST_MUTATION = gql`
  mutation unpinPost($postId: ID!) {
    unpinPost(postId: $postId)
  }
`

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`

export const ROCKET_POST_MUTATION = gql`
  mutation rocketPost($postId: ID!) {
    rocketPost(postId: $postId)
  }
`

export const UNROCKET_POST_MUTATION = gql`
  mutation unrocketPost($postId: ID!) {
    unrocketPost(postId: $postId)
  }
`

export const EDIT_POST_MUTATION = gql`
  mutation editPost($postId: ID!, $newTextContent: String!) {
    editPost(postId: $postId, newTextContent: $newTextContent)
  }
`

export const SIGNUP_MUTATION = gql`
  mutation signUp($username: String!, $email: String, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      accessToken
      user {
        ...USER_FRAGMENT
      }
    }
  }
  ${USER_FRAGMENT}
`

export const useSignUpMutation = () => useMutation(SIGNUP_MUTATION)

export const LOGIN_MUTATION = gql`
  mutation login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      accessToken
      user {
        ...USER_FRAGMENT
      }
    }
  }
  ${USER_FRAGMENT}
`

export const useLoginMutation = () => useMutation(LOGIN_MUTATION)

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($text: String!, $channelId: ID!) {
    sendMessage(text: $text, channelId: $channelId)
  }
`

export const useSendMessageMutation = () => useMutation(SEND_MESSAGE_MUTATION)
