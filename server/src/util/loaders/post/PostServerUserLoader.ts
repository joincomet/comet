import { EntityManager } from '@mikro-orm/postgresql'
import { Post, ServerUser } from '@/entity'
import DataLoader from 'dataloader'
import {logger} from "@/util";

export const postServerUserLoader = (em: EntityManager) => {
  const loader = new DataLoader<string, ServerUser>(
    async (postIds: string[]) => {
      logger('postServerUserLoader', postIds)
      loader.clearAll()
      const posts = (await em.find(Post, {id:postIds, isDeleted: false}, ['server'])).filter(p => !!p.author)
      const serverIds = posts.map(p => p.server.id)
      const authorIds = posts.map(p => p.author.id)
      const serverUsers = await em.find(
        ServerUser,
        {
          server: serverIds,
          user: authorIds
        },
        ['user', 'role']
      )
      const map: Record<string, ServerUser> = {}
      postIds.forEach(postId => {
        const post = posts.find(post => post.id === postId)
        if (!post) {
          map[postId] = null
        } else {
          map[postId] = serverUsers.find(su => su.server === post.server && su.user === post.author)
        }
      })
      return postIds.map(postId => map[postId])
    }
  )
  return loader
}
