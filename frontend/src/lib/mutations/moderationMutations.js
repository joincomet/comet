import { request } from '@/lib/Request'
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

export const useRemovePostMutation = () => useMutation(removePost)

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

export const useRemoveCommentMutation = () => useMutation(removeComment)

const banUserFromPlanet = async variables => {
  await request(
    null,
    gql`
      mutation banUserFromPlanet(
        $planetId: ID!
        $bannedId: ID!
        $reason: String!
      ) {
        banUserFromPlanet(
          planetId: $planetId
          bannedId: $bannedId
          reason: $reason
        )
      }
    `,
    variables
  )
}

export const useBanUserFromPlanetMutation = () => useMutation(banUserFromPlanet)

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

export const useBanUserMutation = () => useMutation(banUser)

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

export const useBanAndPurgeUserMutation = () => useMutation(banAndPurgeUser)
