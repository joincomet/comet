import DataLoader from 'dataloader'
import { getRepository } from 'typeorm'
import { Comment } from '@/comment/Comment.Entity'

export const commentLoader = new DataLoader(async (keys: number[]) => {
  const entities = await getRepository(Comment)
    .createQueryBuilder('comment')
    .whereInIds(keys)
    .getMany()

  const entityMap: any = {}
  entities.forEach(entity => {
    entityMap[entity.id] = entity
  })

  return keys.map((key: number) => entityMap[key])
})
