import * as TypeORM from 'typeorm'
import { getRepository } from 'typeorm'
import { Container } from 'typedi'
import fs from 'fs'
import path from 'path'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { Planet } from '@/entities/Planet'
import { Post } from '@/entities/Post'
import { runIframely } from '@/iframely/RunIframely'
import { isImageURL, isURL } from '@/IsURL'
import { Sema } from 'async-sema'
import { Embed } from '@/types/post/Embed'
import { URL } from 'url'
import { hasFile, uploadImage } from '@/S3Storage'
import got from 'got'
import { User } from '@/entities/User'

TypeORM.useContainer(Container)

const isValidContentType = (contentType: string | null | undefined) => {
  if (!contentType) return false
  const ext = contentType.replace('image/', '')
  return ext === 'jpeg' || ext === 'jpg' || ext === 'png' || ext === 'webp'
}

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

  console.info(
    '--- Retrieving embed data from existing link posts and reuploading images ---'
  )
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
        if (await isImageURL(post.linkURL)) {
          const res = await got.get(post.linkURL, { timeout: 5000 })
          if (
            !res ||
            !(res.statusCode >= 200 && res.statusCode < 300) ||
            !res.headers
          )
            return
          const { headers } = res
          const contentType = headers['content-type']
          if (!isValidContentType(contentType)) return

          const key = `post/${post.id36}.png`

          if (!(await hasFile(key))) {
            await uploadImage(
              key,
              await got.get(post.linkURL, { timeout: 5000 }).buffer(),
              contentType
            )
          }

          await postRepo.update(post.id, { imageCount: 1, linkURL: null })
        } else {
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

          if (thumbnailSourceURL) {
            const contentType = embedResponse.links.thumbnail[0].type
            if (isValidContentType(contentType)) {
              const key = `post/${post.id36}/thumb.png`
              if (!(await hasFile(key))) {
                try {
                  await uploadImage(
                    key,
                    await got
                      .get(thumbnailSourceURL, { timeout: 5000 })
                      .buffer(),
                    contentType
                  )
                } catch {}
              }
            }
          }

          let faviconSourceURL
          if (embedResponse.links.icon && embedResponse.links.icon.length > 0)
            faviconSourceURL = embedResponse.links.icon[0].href

          if (faviconSourceURL) {
            const contentType = embedResponse.links.icon[0].type
            if (isValidContentType(contentType)) {
              const key = `favicons/${domain}.png`
              if (!(await hasFile(key))) {
                try {
                  await uploadImage(
                    key,
                    await got.get(faviconSourceURL, { timeout: 5000 }).buffer(),
                    contentType
                  )
                } catch {}
              }
            }
          }

          const embed: Embed = {
            title,
            description
          }
          await postRepo.update(post.id, { embed })
        }
      } finally {
        s.release()
      }
    }

    await Promise.all(posts.map(fetchEmbedData))
  }

  console.info('--- Reuploading user images ---')
  const userRepo = getRepository(User)
  const users = await userRepo.createQueryBuilder('user').getMany()

  if (users) {
    const s = new Sema(16, { capacity: 100 })

    async function handleUser(user: User) {
      await s.acquire()
      try {
        const { avatarURL, bannerURL } = user.profile as any
        if (avatarURL) {
          try {
            const { headers } = await got.get(avatarURL, { timeout: 5000 })
            const contentType = headers['content-type']
            if (isValidContentType(contentType)) {
              const key = `user/${user.id36}/avatar-0.png`
              if (!(await hasFile(key))) {
                await uploadImage(
                  key,
                  await got.get(avatarURL, { timeout: 5000 }).buffer(),
                  contentType
                )
              }
              await userRepo.update(user.id, { avatarVersion: 0 })
            }
          } catch {}
        }
        if (bannerURL) {
          try {
            const { headers } = await got.get(bannerURL, { timeout: 5000 })
            const contentType = headers['content-type']
            if (isValidContentType(contentType)) {
              const key = `user/${user.id36}/banner-0.png`
              if (!(await hasFile(key))) {
                await uploadImage(
                  key,
                  await got.get(bannerURL, { timeout: 5000 }).buffer(),
                  contentType
                )
              }
              await userRepo.update(user.id, { bannerVersion: 0 })
            }
          } catch {}
        }
      } finally {
        s.release()
      }
    }

    await Promise.all(users.map(handleUser))
  }

  console.info('--- Reuploading planet images ---')
  const planets = await planetRepo.createQueryBuilder('planet').getMany()

  if (planets) {
    const s = new Sema(16, { capacity: 100 })

    async function handlePlanets(planet: Planet) {
      await s.acquire()
      try {
        const { avatarURL, bannerURL } = planet.profile as any
        if (avatarURL) {
          try {
            const { headers } = await got.get(avatarURL, { timeout: 5000 })
            const contentType = headers['content-type']
            if (isValidContentType(contentType)) {
              const key = `planet/${planet.id36}/avatar-0.png`
              if (!(await hasFile(key))) {
                await uploadImage(
                  key,
                  await got.get(avatarURL, { timeout: 5000 }).buffer(),
                  contentType
                )
              }
              await planetRepo.update(planet.id, { avatarVersion: 0 })
            }
          } catch {}
        }
        if (bannerURL) {
          try {
            const { headers } = await got.get(bannerURL, { timeout: 5000 })
            const contentType = headers['content-type']
            if (isValidContentType(contentType)) {
              const key = `planet/${planet.id36}/banner-0.png`
              if (!(await hasFile(key))) {
                await uploadImage(
                  key,
                  await got.get(bannerURL, { timeout: 5000 }).buffer(),
                  contentType
                )
              }
              await planetRepo.update(planet.id, { bannerVersion: 0 })
            }
          } catch {}
        }
      } finally {
        s.release()
      }
    }

    await Promise.all(planets.map(handlePlanets))
  }

  console.info('--- Done ---')
  connection.close()
  return process.exit(0)
}

run()
