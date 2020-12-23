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

export const useFollowUserMutation = () => useMutation(followUser)

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

export const useUnfollowUserMutation = () => useMutation(unfollowUser)

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

export const useBlockUserMutation = () => useMutation(blockUser)

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

export const useUnblockUserMutation = () => useMutation(unblockUser)
