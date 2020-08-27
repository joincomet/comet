import { getRepository } from 'typeorm'
import { User } from './entities/User'
import { Comment } from './entities/Comment'
import DataLoader from 'dataloader'
import { Post } from './entities/Post'
import { PostView } from './entities/PostView'

export const UserLoader = new DataLoader(async (keys: string[]) => {
  const entities = await getRepository(User)
    .createQueryBuilder('user')
    .whereInIds(keys)
    .getMany()

  const entityMap: any = {}
  entities.forEach((entity) => {
    entityMap[entity.id] = entity
  })

  return keys.map((key: string) => entityMap[key])
})

export const CommentLoader = new DataLoader(async (keys: string[]) => {
  const entities = await getRepository(Comment)
    .createQueryBuilder('comment')
    .whereInIds(keys)
    .getMany()

  const entityMap: any = {}
  entities.forEach((entity) => {
    entityMap[entity.id] = entity
  })

  return keys.map((key: string) => entityMap[key])
})

export const PostLoader = new DataLoader(async (keys: string[]) => {
  const entities = await getRepository(Post)
    .createQueryBuilder('post')
    .whereInIds(keys)
    .leftJoinAndSelect('post.planet', 'planet')
    .getMany()

  const entityMap: any = {}
  entities.forEach((entity) => {
    entityMap[entity.id] = entity
  })

  return keys.map((key: string) => entityMap[key])
})

export const PostViewLoader = new DataLoader(
  async (keys: { userId: string; postId: string }[]) => {
    const entities = await getRepository(PostView)
      .createQueryBuilder('postView')
      .whereInIds(keys)
      .getMany()

    return keys.map((key: { userId: string; postId: string }) =>
      entities.find(
        (entity) => entity.postId === key.postId && entity.userId === key.userId
      )
    )
  }
)
