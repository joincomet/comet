import { request } from '../network/request'
import { gql } from 'graphql-request'
import { useMutation } from 'react-query'

const removePost = async variables => {
  await request(
    null,
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
    null,
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
    null,
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
    null,
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
    null,
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
