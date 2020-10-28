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
import { Embed } from '@/types/post/Embed'
import { URL } from 'url'
import { hasFile, uploadImage } from '@/S3Storage'
import got from 'got'

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

    const s = new Sema(16, { capacity: 100 })

    async function fetchEmbedData(post: Post) {
      await s.acquire()
      try {
        const embedResponse = await runIframely(post.linkURL)
        if (!embedResponse || !embedResponse.meta || !embedResponse.links) {
          return
        }
        const { title, description } = embedResponse.meta

        if (!title) return

        let domain
        try {
          domain = new URL(post.linkURL).host
          if (domain.includes('www.')) domain = domain.split('www.')[1]
        } catch {}

        if (
          !embedResponse.links.thumbnail ||
          embedResponse.links.thumbnail.length === 0
        )
          return
        const thumbnailSourceURL = embedResponse.links.thumbnail[0].href
        let thumbnailURL

        if (thumbnailSourceURL) {
          const contentType = embedResponse.links.thumbnail[0].type
          const key = `${post.id36}/thumb.${contentType.replace('image/', '')}`
          if (!(await hasFile(key))) {
            const body = await got.get(thumbnailSourceURL)
            thumbnailURL = await uploadImage(key, body, contentType)
          }
        }

        let faviconSourceURL, faviconURL
        if (embedResponse.links.icon && embedResponse.links.icon.length > 0)
          faviconSourceURL = embedResponse.links.icon[0].href

        if (faviconSourceURL) {
          const contentType = embedResponse.links.icon[0].type
          const key = `favicons/${domain}.${contentType.replace('image/', '')}`
          if (!(await hasFile(key))) {
            const body = await got.get(faviconSourceURL)
            faviconURL = await uploadImage(key, body, contentType)
          }
        }

        const embed: Embed = {
          title,
          description
        }
        await postRepo.update(post.id, { embed })
      } finally {
        s.release()
      }
    }

    await Promise.all(posts.map(fetchEmbedData))
  }

  console.info('--- Done ---')
  connection.close()
  return process.exit(0)
}

run()
