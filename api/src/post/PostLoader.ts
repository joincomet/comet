import DataLoader from 'dataloader'
import { getRepository } from 'typeorm'
import { Post } from '@/post/Post.Entity'

export const postLoader = new DataLoader(async (keys: number[]) => {
  const entities = await getRepository(Post)
    .createQueryBuilder('post')
    .whereInIds(keys)
    .leftJoinAndSelect('post.planet', 'planet')
    .getMany()

  const entityMap: any = {}
  entities.forEach(entity => {
    entityMap[entity.id] = entity
  })

  return keys.map((key: number) => entityMap[key])
})
