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
