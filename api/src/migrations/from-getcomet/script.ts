import * as TypeORM from 'typeorm'
import { getRepository } from 'typeorm'
import { Container } from 'typedi'
import { Planet } from '@/planet/Planet.Entity'
import { Post } from '@/post/Post.Entity'
import { connectDatabase } from '@/ConnectDatabase'
import {
  getPostEmbeds,
  reuploadPlanetImages,
  reuploadPostImages,
  reuploadUserImages
} from '@/migrations/from-getcomet/migrations'
import { User } from '@/user/User.Entity'

TypeORM.useContainer(Container)

const run = async () => {
  const connection = await connectDatabase(true, false)

  const planetRepo = getRepository(Planet)
  console.info('--- Deleting planets with 0 posts ---')
  const planetsToDelete = (
    await planetRepo
      .createQueryBuilder('planet')
      .loadRelationCountAndMap('planet.postCount', 'planet.posts')
      .getMany()
  )
    .filter(c => (c as any).postCount === 0)
    .map(c => c.id)

  if (planetsToDelete && planetsToDelete.length > 0) {
    await planetRepo.delete(planetsToDelete)
  }

  // await getPostEmbeds(getRepository(Post))
  await reuploadPostImages(getRepository(Post))
  await reuploadUserImages(getRepository(User))
  await reuploadPlanetImages(getRepository(Planet))

  console.info('--- Done ---')
  await connection.close()
  return process.exit(0)
}

run()
