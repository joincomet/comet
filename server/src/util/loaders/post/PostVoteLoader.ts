import { EntityManager } from '@mikro-orm/postgresql'
import { Post, PostVote, VoteType } from '@/entity'
import DataLoader from 'dataloader'
import {logger} from "@/util";

export const postVoteLoader = (em: EntityManager, userId: string) => {
  const loader = new DataLoader<string, VoteType>(async (postIds: string[]) => {
    logger('postVoteLoader', postIds)
    loader.clearAll()
    if (!userId) return postIds.map(_ => VoteType.None)
    const postVotes = await em.find(PostVote, {
      post: postIds,
      user: userId
    })
    const map: Record<string, VoteType> = {}
    postIds.forEach(
      postId =>
        (map[postId] =
          postVotes.find(pv => pv.post === em.getReference(Post, postId))
            ?.type ?? VoteType.None)
    )
    return postIds.map(postId => map[postId])
  })
  return loader
}
