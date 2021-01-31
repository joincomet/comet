import DataLoader from 'dataloader'
import { Comment } from '@/comment/Comment.Entity'

export const commentLoader = new DataLoader(async (keys: bigint[]) => {
  const entities = await getRepository(Comment)
    .createQueryBuilder('comment')
    .whereInIds(keys)
    .getMany()

  const entityMap: any = {}
  entities.forEach(entity => {
    entityMap[entity.id] = entity
  })

  return keys.map((key: bigint) => entityMap[key])
})
