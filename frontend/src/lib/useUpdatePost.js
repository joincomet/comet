import usePostsVariables from '@/lib/usePostsVariables'
import { useQueryClient } from 'react-query'

export function useUpdatePost() {
  const postsVariables = usePostsVariables()
  const queryClient = useQueryClient()
  return (postId, update) => {
    const postKey = ['post', { postId }]
    if (queryClient.getQueryData(postKey))
      queryClient.setQueryData(postKey, old => ({
        ...old,
        ...update
      }))
    const postsKey = ['posts', postsVariables]
    if (queryClient.getQueryData(postsKey)) {
      queryClient.setQueryData(postsKey, old => {
        const result = { ...old }
        const index = result.posts.findIndex(po => po.id36 === postId)
        result.posts[index] = { ...result.posts[index], ...update }
        return result
      })
    }
  }
}

export function useRemovePost() {
  const postsVariables = usePostsVariables()
  const queryClient = useQueryClient()
  return postId => {
    const postsKey = ['posts', postsVariables]
    if (queryClient.getQueryData(postsKey)) {
      queryClient.setQueryData(postsKey, old => {
        const result = { ...old }
        result.posts = result.posts.filter(p => p.id36 !== postId)
        return result
      })
    }
  }
}
