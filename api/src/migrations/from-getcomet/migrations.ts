import { Repository } from 'typeorm'
import { Post } from '@/post/Post.Entity'
import { isUrl } from '@/IsUrl'
import { Sema } from 'async-sema'
import { scrapeMetadata } from '@/metascraper/scrapeMetadata'
import got from 'got'
import { uploadImage } from '@/S3Storage'
import { User } from '@/user/User.Entity'
import { Planet } from '@/planet/Planet.Entity'

export const getPostEmbeds = async (postRepo: Repository<Post>) => {
  console.info('--- Retrieving embed data from existing link posts ---')
  let posts = await postRepo
    .createQueryBuilder('post')
    .where('post.linkUrl IS NOT NULL')
    .orderBy('post.createdAt', 'DESC')
    .getMany()

  if (!posts || posts.length === 0) return

  posts = posts.filter(p => isUrl(p.linkUrl))

  const sema = new Sema(64, { capacity: posts.length })

  async function fetchEmbedData(post: Post) {
    await sema.acquire()
    try {
      const meta = await scrapeMetadata(post.linkUrl)
      if (meta) {
        await postRepo.update(post.id, { meta })
        console.log(`Completed ${post.linkUrl}`)
      }
    } finally {
      sema.release()
    }
  }

  await Promise.all(posts.map(fetchEmbedData))
}

export const reuploadPostImages = async (postRepo: Repository<Post>) => {
  console.info('--- Reuploading post images ---')
  const posts = await postRepo
    .createQueryBuilder('post')
    .where('array_length(post.imageUrls, 1) > 0')
    .orderBy('post.createdAt', 'DESC')
    .getMany()

  if (!posts || posts.length === 0) return

  const sema = new Sema(64, { capacity: posts.length })

  async function reuploadImage(post: Post) {
    await sema.acquire()
    try {
      const imageUrl = await uploadImage(
        got.stream(post.imageUrls[0]),
        'image/png'
      )
      await postRepo.update(post.id, { imageUrls: [imageUrl] })
      console.log(`Completed ${imageUrl}`)
    } finally {
      sema.release()
    }
  }

  await Promise.all(posts.map(reuploadImage))
}

export const reuploadUserImages = async (userRepo: Repository<User>) => {
  console.info('--- Reuploading user images ---')
  const users = await userRepo
    .createQueryBuilder('user')
    .where('user.avatarUrl IS NOT NULL')
    .orWhere('user.bannerUrl IS NOT NULL')
    .getMany()

  if (!users || users.length === 0) return

  const sema = new Sema(64, { capacity: users.length })

  async function reuploadImages(user: User) {
    await sema.acquire()
    try {
      let avatarUrl = null
      let bannerUrl = null
      if (user.avatarUrl) {
        avatarUrl = await uploadImage(got.stream(user.avatarUrl), 'image/png', {
          width: 256,
          height: 256
        })
      }
      if (user.bannerUrl) {
        bannerUrl = await uploadImage(got.stream(user.bannerUrl), 'image/png', {
          width: 1920
        })
      }
      await userRepo.update(user.id, { avatarUrl, bannerUrl })
      console.log(`Completed @${user.username}`)
    } finally {
      sema.release()
    }
  }

  await Promise.all(users.map(reuploadImages))
}

export const reuploadPlanetImages = async (planetRepo: Repository<Planet>) => {
  console.info('--- Reuploading planet images ---')
  const planets = await planetRepo
    .createQueryBuilder('planet')
    .where('planet.avatarUrl IS NOT NULL')
    .orWhere('planet.bannerUrl IS NOT NULL')
    .getMany()

  if (!planets || planets.length === 0) return

  const sema = new Sema(64, { capacity: planets.length })

  async function reuploadImages(planet: Planet) {
    await sema.acquire()
    try {
      let avatarUrl = null
      let bannerUrl = null
      if (planet.avatarUrl) {
        avatarUrl = await uploadImage(
          got.stream(planet.avatarUrl),
          'image/png',
          { width: 256, height: 256 }
        )
      }
      if (planet.bannerUrl) {
        bannerUrl = await uploadImage(
          got.stream(planet.bannerUrl),
          'image/png',
          { width: 1920 }
        )
      }
      await planetRepo.update(planet.id, { avatarUrl, bannerUrl })
      console.log(`Completed +${planet.name}`)
    } finally {
      sema.release()
    }
  }

  await Promise.all(planets.map(reuploadImages))
}
