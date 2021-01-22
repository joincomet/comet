import { request } from '@/lib/Request'
import { gql } from 'graphql-request'
import { useMutation } from 'react-query'

const followUser = async variables => {
  await request(
    null,
    gql`
      mutation followUser($followedId: ID!) {
        followUser(followedId: $followedId)
      }
    `,
    variables
  )
}

export const useFollowUserMutation = options => useMutation(followUser, options)

const unfollowUser = async variables => {
  await request(
    null,
    gql`
      mutation unfollowUser($followedId: ID!) {
        unfollowUser(followedId: $followedId)
      }
    `,
    variables
  )
}

export const useUnfollowUserMutation = options =>
  useMutation(unfollowUser, options)

const blockUser = async variables => {
  await request(
    null,
    gql`
      mutation blockUser($blockedId: ID!) {
        blockUser(blockedId: $blockedId)
      }
    `,
    variables
  )
}

export const useBlockUserMutation = options => useMutation(blockUser, options)

const unblockUser = async variables => {
  await request(
    null,
    gql`
      mutation unblockUser($blockedId: ID!) {
        unblockUser(blockedId: $blockedId)
      }
    `,
    variables
  )
}

export const useUnblockUserMutation = options =>
  useMutation(unblockUser, options)
