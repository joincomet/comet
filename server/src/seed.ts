import { EntityManager } from '@mikro-orm/postgresql'
import {
  Channel,
  Folder,
  FriendRelationship,
  Message,
  Post,
  Server,
  ServerFolder,
  ServerUserJoin,
  User,
  UserFolder
} from '@/entity'
import { Lexico, tagGenerator } from '@/util'
import * as argon2 from 'argon2'
import faker from 'faker'

const NUM_USERS = 1000
const MAX_MESSAGES_PER_USER = 5

const rand = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const seed = async (em: EntityManager) => {
  const createFolder = (name: string, owner: User, description?: string) =>
    em.create(Folder, { name, description, owner })

  const createUserFolders = (user: User) => [
    em.create(UserFolder, {
      user,
      folder: createFolder('Favorites', user)
    }),
    em.create(UserFolder, {
      user,
      folder: createFolder('Read Later', user)
    })
  ]

  const entities = []

  const passwordHash = await argon2.hash('password')

  const userAdmin = em.create(User, {
    name: 'Admin',
    tag: '0001',
    email: 'admin@joincomet.app',
    passwordHash,
    isAdmin: true
  })

  const userDan = em.create(User, {
    name: 'Dan',
    tag: tagGenerator(),
    email: 'dan@joincomet.app',
    passwordHash
  })

  const userMichael = em.create(User, {
    name: 'Michael',
    tag: tagGenerator(),
    email: 'michael@joincomet.app',
    passwordHash
  })

  const serverComet = em.create(Server, {
    name: 'Comet',
    description: 'Official comet server',
    isFeatured: true,
    featuredPosition: Lexico.FIRST_POSITION,
    owner: userDan,
    avatarUrl:
      'https://pbs.twimg.com/profile_images/1316960164008751104/lBuM-qHc_400x400.jpg'
  })

  const channelGeneral = em.create(Channel, {
    name: 'general',
    description: 'General discussion relating to Comet',
    server: serverComet
  })

  entities.push(
    userAdmin,
    userDan,
    userMichael,
    serverComet,
    channelGeneral,
    ...createUserFolders(userDan),
    ...createUserFolders(userMichael),
    em.create(ServerUserJoin, { user: userAdmin, server: serverComet }),
    em.create(ServerUserJoin, { user: userDan, server: serverComet }),
    em.create(ServerFolder, {
      server: serverComet,
      folder: createFolder(
        'Announcements',
        userDan,
        'All official Comet announcements'
      )
    }),
    em.create(FriendRelationship, {
      user1: userDan,
      user2: userMichael
    })
  )

  const users: User[] = []
  for (let i = 0; i < NUM_USERS; i++) {
    const user = em.create(User, {
      name: faker.name.firstName(),
      tag: tagGenerator(),
      passwordHash,
      email: faker.internet.email(),
      avatarUrl:
        rand(1, 2) === 1
          ? faker.image.imageUrl(256, 256, undefined, true, true)
          : null
    })
    if (
      users.filter(
        u =>
          u.email === user.email || (u.name === user.name && u.tag === user.tag)
      ).length > 0
    )
      continue
    users.push(user)
    entities.push(em.create(ServerUserJoin, { user, server: serverComet }))
    const numMessages = rand(1, MAX_MESSAGES_PER_USER)
    for (let j = 0; j < numMessages; j++) {
      const message = em.create(Message, {
        author: user,
        channel: channelGeneral,
        createdAt: faker.date.recent(),
        text: faker.lorem.paragraph()
      })
      entities.push(message)
    }

    const n = rand(1, 3)
    let post
    const postData = {
      createdAt: faker.date.recent(),
      title: faker.hacker.phrase(),
      author: user,
      server: serverComet,
      voteCount: rand(1, 100)
    }
    if (n === 1) {
      // Text
      post = em.create(Post, {
        ...postData,
        text: faker.lorem.paragraphs()
      })
    } else if (n === 2) {
      // Link
      const url = faker.internet.url()
      post = em.create(Post, {
        ...postData,
        linkUrl: url,
        linkMetadata: {
          title: faker.hacker.phrase(),
          description: faker.lorem.sentence(),
          data: faker.date.recent(),
          author: faker.name.findName(),
          publisher: faker.company.companyName(),
          image: faker.image.imageUrl(1920, 1080, undefined, true, true),
          logo: faker.image.imageUrl(16, 16, undefined, true, true),
          url,
          twitterCard: 'summary_large_image'
        }
      })
    } else if (n === 3) {
      // Image
      const numImages = rand(1, 5)
      const imageUrls = []
      for (let j = 0; j < numImages; j++) {
        imageUrls.push(faker.image.imageUrl(1920, 1080, undefined, true, true))
      }
      post = em.create(Post, {
        ...postData,
        imageUrls
      })
    }
    entities.push(post)
  }

  entities.push(...users)
  await em.persistAndFlush(entities)
}
