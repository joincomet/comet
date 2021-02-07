

import { useMutation, gql } from '@apollo/client'

const submitPost = async variables => {
  const { submitPost } = await request(
    gql`
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
          id36
          relativeUrl
        }
      }
    `,
    variables
  )
  return submitPost
}

export const useSubmitPostMutation = options => useMutation(submitPost, options)

const pinPost = async variables => {
  await request(
    gql`
      mutation pinPost($planetId: ID!, $postId: ID!) {
        pinPost(planetId: $planetId, postId: $postId)
      }
    `,
    variables
  )
}

export const usePinPostMutation = options => useMutation(pinPost, options)

const unpinPost = async variables => {
  await request(
    gql`
      mutation unpinPost($planetId: ID!, $postId: ID!) {
        unpinPost(planetId: $planetId, postId: $postId)
      }
    `,
    variables
  )
}

export const useUnpinPostMutation = options => useMutation(unpinPost, options)

const deletePost = async variables => {
  await request(
    gql`
      mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
      }
    `,
    variables
  )
}

export const useDeletePostMutation = options => useMutation(deletePost, options)

const rocketPost = async variables => {
  await request(
    gql`
      mutation rocketPost($postId: ID!) {
        rocketPost(postId: $postId)
      }
    `,
    variables
  )
}

export const useRocketPostMutation = options => useMutation(rocketPost, options)

const unrocketPost = async variables => {
  await request(
    gql`
      mutation unrocketPost($postId: ID!) {
        unrocketPost(postId: $postId)
      }
    `,
    variables
  )
}

export const useUnrocketPostMutation = options =>
  useMutation(unrocketPost, options)

const editPost = async variables => {
  await request(
    gql`
      mutation editPost($postId: ID!, $newTextContent: String!) {
        editPost(postId: $postId, newTextContent: $newTextContent)
      }
    `,
    variables
  )
}

export const useEditPostMutation = options => useMutation(editPost, options)
