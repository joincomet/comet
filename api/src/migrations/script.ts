import * as TypeORM from 'typeorm'
import { getRepository } from 'typeorm'
import { Container } from 'typedi'
import fs from 'fs'
import path from 'path'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { Planet } from '@/entities/Planet'
import { Post } from '@/entities/Post'
import { runIframely } from '@/iframely/RunIframely'
import { isURL } from '@/IsURL'
import { Sema } from 'async-sema'

TypeORM.useContainer(Container)

const run = async () => {
  let connection
  try {
    connection = await TypeORM.createConnection({
      type: 'postgres',
      username:
        process.env.NODE_ENV === 'production'
          ? process.env.DB_USERNAME
          : 'postgres',
      password:
        process.env.NODE_ENV === 'production'
          ? process.env.DB_PASSWORD
          : 'password',
      host:
        process.env.NODE_ENV === 'production'
          ? process.env.DB_HOST
          : 'localhost',
      port:
        process.env.NODE_ENV === 'production'
          ? parseInt(process.env.DB_PORT)
          : 5432,
      database:
        process.env.NODE_ENV === 'production'
          ? process.env.DB_DATABASE
          : 'postgres',
      // url: process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : 'postgresql://postgres:password@postgres:5432/postgres',
      entities: [__dirname + '/../entities/**/*.{ts,js}'],
      synchronize: true,
      logging: false,
      dropSchema: false, // CLEARS DATABASE ON START
      cache: true,
      ssl:
        process.env.NODE_ENV === 'production'
          ? {
              ca: fs.readFileSync(path.resolve('./ca-certificate.crt'), {
                encoding: 'utf8'
              })
            }
          : undefined,
      namingStrategy: new SnakeNamingStrategy()
    })
  } catch (e) {
    console.error(e)
    return process.exit(-1)
  }

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

  const postRepo = getRepository(Post)

  console.info('--- Retrieving embed data from existing link posts ---')
  let posts = await postRepo
    .createQueryBuilder('post')
    .where('post.linkURL IS NOT NULL AND post.embed IS NULL')
    .orderBy('post.createdAt', 'DESC')
    .getMany()

  if (posts) {
    posts = posts.filter(p => isURL(p.linkURL))

    const s = new Sema(32, { capacity: 100 })

    async function fetchEmbedData(post: Post) {
      await s.acquire()
      try {
        // console.log(s.nrWaiting() + ' calls to fetch are waiting')
        const embed = await runIframely(post.linkURL)
        await postRepo.update(post.id, { embed })
      } finally {
        s.release()
      }
    }

    await Promise.all(posts.map(fetchEmbedData))

    /*
    const results = await mapLimit(
      posts.map(p => p.linkURL),
      50,
      async url => runIframely(url)
    )
    console.log(results)*/

    // console.log(results)
  }

  /*  for (const post of posts) {
    try {
      const embed = await runIframely(post.linkURL)
      await postRepo.update(post.id, { embed })
    } catch (e) {
      console.warn(`Failed: ${post.linkURL}`)
    }
  }*/

  console.info('--- Done ---')
  connection.close()
  return process.exit(0)
}

run()
