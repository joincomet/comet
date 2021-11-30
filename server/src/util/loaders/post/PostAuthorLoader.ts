import { EntityManager } from '@mikro-orm/postgresql'
import { Post, User} from '@/entity'
import DataLoader from 'dataloader'
import {logger} from "@/util";

export const postAuthorLoader = (em: EntityManager) => {
  const loader = new DataLoader<string, User>(
    async (postIds: string[]) => {
      logger('postAuthorLoader', postIds)
      loader.clearAll()
      const posts = await em.find(Post, postIds, ['author'])
      const map: Record<string, User> = {}
      postIds.forEach(postId => {
        const post = posts.find(post => post.id === postId)
        if (post.isDeleted) {
          map[postId] = null
        } else {
          map[postId] = post.author
        }
      })
      return postIds.map(postId => map[postId])
    }
  )
  return loader
}
