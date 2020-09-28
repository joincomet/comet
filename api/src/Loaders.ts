import DataLoader from 'dataloader'
import { getRepository } from 'typeorm'
import { User } from '@/entities/User'
import { Comment } from '@/entities/Comment'
import { Post } from '@/entities/Post'

export const UserLoader = new DataLoader(async (keys: number[]) => {
  const entities = await getRepository(User)
    .createQueryBuilder('user')
    .whereInIds(keys)
    .getMany()

  const entityMap: any = {}
  entities.forEach((entity) => {
    entityMap[entity.id] = entity
  })

  return keys.map((key: number) => entityMap[key])
})

export const CommentLoader = new DataLoader(async (keys: number[]) => {
  const entities = await getRepository(Comment)
    .createQueryBuilder('comment')
    .whereInIds(keys)
    .getMany()

  const entityMap: any = {}
  entities.forEach((entity) => {
    entityMap[entity.id] = entity
  })

  return keys.map((key: number) => entityMap[key])
})

export const PostLoader = new DataLoader(async (keys: number[]) => {
  const entities = await getRepository(Post)
    .createQueryBuilder('post')
    .whereInIds(keys)
    .leftJoinAndSelect('post.community', 'community')
    .getMany()

  const entityMap: any = {}
  entities.forEach((entity) => {
    entityMap[entity.id] = entity
  })

  return keys.map((key: number) => entityMap[key])
})
