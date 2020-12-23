import { request } from '@/lib/Request'
import { gql } from 'graphql-request'
import { useMutation } from 'react-query'

const submitPost = async variables => {
  const { submitPost } = await request(
    null,
    gql`
      mutation submitPost(
        $title: String
        $link: String
        $textContent: String
        $planetName: String
        $images: [Upload!]
      ) {
        submitPost(
          title: $title
          link: $link
          textContent: $textContent
          planetName: $planetName
          images: $images
        ) {
          id
          id36
          relativeUrl
        }
      }
    `,
    variables
  )
  return submitPost
}

export const useSubmitPostMutation = () => useMutation(submitPost)

const pinPost = async variables => {
  await request(
    null,
    gql`
      mutation pinPost($planetId: ID!, $postId: ID!) {
        pinPost(planetId: $planetId, postId: $postId)
      }
    `,
    variables
  )
}

export const usePinPostMutation = () => useMutation(pinPost)

const unpinPost = async variables => {
  await request(
    null,
    gql`
      mutation unpinPost($planetId: ID!, $postId: ID!) {
        unpinPost(planetId: $planetId, postId: $postId)
      }
    `,
    variables
  )
}

export const useUnpinPostMutation = () => useMutation(unpinPost)

const pinPostProfile = async variables => {
  await request(
    null,
    gql`
      mutation pinPostProfile($postId: ID!) {
        pinPostProfile(postId: $postId)
      }
    `,
    variables
  )
}

export const usePinPostProfileMutation = () => useMutation(pinPostProfile)

const unpinPostProfile = async variables => {
  await request(
    null,
    gql`
      mutation unpinPostProfile($postId: ID!) {
        unpinPostProfile(postId: $postId)
      }
    `,
    variables
  )
}

export const useUnpinPostProfileMutation = () => useMutation(unpinPostProfile)

const deletePost = async variables => {
  await request(
    null,
    gql`
      mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
      }
    `,
    variables
  )
}

export const useDeletePostMutation = () => useMutation(deletePost)

const rocketPost = async variables => {
  await request(
    null,
    gql`
      mutation rocketPost($postId: ID!) {
        rocketPost(postId: $postId)
      }
    `,
    variables
  )
}

export const useRocketPostMutation = () => useMutation(rocketPost)

const unrocketPost = async variables => {
  await request(
    null,
    gql`
      mutation unrocketPost($postId: ID!) {
        unrocketPost(postId: $postId)
      }
    `,
    variables
  )
}

export const useUnrocketPostMutation = () => useMutation(unrocketPost)
