import DataLoader from 'dataloader'
import { getRepository } from 'typeorm'
import { User } from '@/user/User.Entity'

export const userLoader = new DataLoader(async (keys: number[]) => {
  const entities = await getRepository(User)
    .createQueryBuilder('user')
    .whereInIds(keys)
    .getMany()

  const entityMap: any = {}
  entities.forEach(entity => {
    entityMap[entity.id] = entity
  })

  return keys.map((key: number) => entityMap[key])
})
