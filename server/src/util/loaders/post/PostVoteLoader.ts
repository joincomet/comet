import { EntityManager } from '@mikro-orm/postgresql'
import { Post, PostVote, User } from '@/entity'
import DataLoader from 'dataloader'

export const postVoteLoader = (em: EntityManager, userId: string) => {
  return new DataLoader<string, boolean>(async (postIds: string[]) => {
    const postVotes = await em.find(PostVote, {
      post: postIds,
      user: userId
    })
    const map: Record<string, boolean> = {}
    postIds.forEach(
      postId =>
        (map[postId] = !!postVotes.find(
          pv => pv.post === em.getReference(Post, postId)
        ))
    )
    return postIds.map(postId => map[postId])
  })
}
