import { gql } from 'graphql-request'
import { useQuery } from 'react-query'
import { request } from '@/lib/Request'

const unflatten = comments => {
  const hashTable = Object.create(null)
  comments.forEach(
    comment => (hashTable[comment.id] = { ...comment, childComments: [] })
  )
  const commentTree = []
  comments.forEach(comment => {
    if (comment.parentCommentId)
      hashTable[comment.parentCommentId].childComments.push(
        hashTable[comment.id]
      )
    else commentTree.push(hashTable[comment.id])
  })
  return commentTree
}

const countChildren = comment => {
  if (!comment.childComments || comment.childComments.length === 0) return 0
  let count = 0
  comment.childComments.forEach(c => {
    count++
    c.childCount = countChildren(c)
    count += c.childCount
  })
  return count
}

export const fetchComments = async ({ queryKey }, ctx = null) => {
  const [_key, variables] = queryKey

  let { comments } = await request(
    ctx,
    gql`
      query comments($postId: ID, $username: String, $sort: CommentSort) {
        comments(postId: $postId, username: $username, sort: $sort) {
          id
          id36
          parentCommentId
          textContent
          rocketCount
          isRocketed
          author {
            id
            username
            name
            avatarUrl
            followerCount
            followingCount
            isFollowing
            isFollowed
            isCurrentUser
          }
          timeSince
          timeSinceEdited
          deleted
          removed
          removedReason
        }
      }
    `,
    variables
  )

  const commentCount = comments.length
  comments = unflatten(comments)
  comments.forEach(c => (c.childCount = countChildren(c)))

  return { comments, commentCount }
}

export const useComments = variables =>
  useQuery(['comments', variables], fetchComments)
