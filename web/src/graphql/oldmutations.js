import { gql } from '@urql/core'

export const UPLOAD_AVATAR_MUTATION = gql`
  mutation uploadAvatar($file: Upload!) {
    uploadAvatar(file: $file)
  }
`

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation changePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
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

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($text: String!, $channelId: ID!) {
    sendMessage(text: $text, channelId: $channelId)
  }
`
