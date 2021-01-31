import DataLoader from 'dataloader'
import { Post } from '@/post/Post.entity'

export const postLoader = new DataLoader(async (keys: bigint[]) => {
  const entities = await getRepository(Post)
    .createQueryBuilder('post')
    .whereInIds(keys)
    .leftJoinAndSelect('post.planet', 'planet')
    .leftJoinAndSelect('post.author', 'author')
    .getMany()

  const entityMap: any = {}
  entities.forEach(entity => {
    entityMap[entity.id] = entity
  })

  return keys.map((key: bigint) => entityMap[key])
})
