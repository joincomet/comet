import DataLoader from 'dataloader'
import { User } from '@/user/User.entity'

export const userLoader = new DataLoader(async (keys: bigint[]) => {
  const entities = await getRepository(User)
    .createQueryBuilder('user')
    .whereInIds(keys)
    .getMany()

  const entityMap: any = {}
  entities.forEach(entity => {
    entityMap[entity.id] = entity
  })

  return keys.map((key: bigint) => entityMap[key])
})
