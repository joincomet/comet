const unflatten = comments => {
  const hashTable = Object.create(null)
  comments.forEach(
    comment => (hashTable[comment.id] = { ...comment, childComments: [] })
  )
  const commentTree = []
  comments.forEach(comment => {
    if (comment.parentComment)
      hashTable[comment.parentComment.id].childComments.push(
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
    if (!c.isDeleted) count++
    c.childCount = countChildren(c)
    count += c.childCount
  })
  return count
}

export const createCommentTree = flatComments => {
  flatComments = unflatten(flatComments)
  flatComments.forEach(c => (c.childCount = countChildren(c)))
  return flatComments
}

export const getParticipants = (flatComments, post) =>
  flatComments
    .filter(c => !!c.author && c.author.id !== post?.author?.id)
    .map(c => ({
      user: c.author,
      serverUser: c.serverUser
    }))
    .filter(
      (obj, index, self) =>
        self.findIndex(other => other.user.id === obj.user.id) === index
    )
