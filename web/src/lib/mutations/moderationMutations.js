

import { useMutation, gql } from '@apollo/client'

const removePost = async variables => {
  await request(
    gql`
      mutation removePost($planetId: ID!, $postId: ID!, $reason: String!) {
        removePost(planetId: $planetId, postId: $postId, reason: $reason)
      }
    `,
    variables
  )
}

export const useRemovePostMutation = options => useMutation(removePost, options)

const removeComment = async variables => {
  await request(
    gql`
      mutation removeComment(
        $planetId: ID!
        $commentId: ID!
        $reason: String!
      ) {
        removeComment(
          planetId: $planetId
          commentId: $commentId
          reason: $reason
        )
      }
    `,
    variables
  )
}

export const useRemoveCommentMutation = options =>
  useMutation(removeComment, options)

const banUserFromPlanet = async variables => {
  await request(
    gql`
      mutation banUserFromPlanet($planetId: ID!, $bannedId: ID!) {
        banUserFromPlanet(planetId: $planetId, bannedId: $bannedId)
      }
    `,
    variables
  )
}

export const useBanUserFromPlanetMutation = options =>
  useMutation(banUserFromPlanet, options)

const banUser = async variables => {
  await request(
    gql`
      mutation banUser($bannedId: ID!, $reason: String!) {
        banUser(bannedId: $bannedId, reason: $reason)
      }
    `,
    variables
  )
}

export const useBanUserMutation = options => useMutation(banUser, options)

const banAndPurgeUser = async variables => {
  await request(
    gql`
      mutation banAndPurgeUser($bannedId: ID!, $reason: String!) {
        banAndPurgeUser(bannedId: $bannedId, reason: $reason)
      }
    `,
    variables
  )
}

export const useBanAndPurgeUserMutation = options =>
  useMutation(banAndPurgeUser, options)
