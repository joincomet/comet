import * as TypeORM from 'typeorm'
import { getRepository } from 'typeorm'
import { Container } from 'typedi'
import { Planet } from '@/planet/Planet.Entity'
import { Post } from '@/post/Post.Entity'
import { connectDatabase } from '@/ConnectDatabase'
import { migratePosts } from '@/migrations/from-getcomet/migratePosts'

TypeORM.useContainer(Container)

const run = async () => {
  const connection = await connectDatabase(true, false)

  const planetRepo = getRepository(Planet)
  console.info('--- Deleting planets with 0 posts ---')
  const planetsToDelete = (
    await planetRepo.createQueryBuilder('planet').getMany()
  )
    .filter(c => c.postCount === 0)
    .map(c => c.id)

  if (planetsToDelete && planetsToDelete.length > 0) {
    await planetRepo.delete(planetsToDelete)
  }

  await migratePosts(getRepository(Post))

  console.info('--- Done ---')
  await connection.close()
  return process.exit(0)
}

run()
