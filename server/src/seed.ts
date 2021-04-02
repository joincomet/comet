import { EntityManager } from '@mikro-orm/postgresql'
import {
  Channel,
  Comment,
  Folder,
  FriendData,
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
import { FriendStatus } from '@/resolver/user'
import { ServerCategory } from '@/resolver/server'

const NUM_USERS = 100
const MAX_MESSAGES_PER_USER = 3

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
    id: '1',
    name: 'Admin',
    tag: '0001',
    email: 'admin@joincomet.app',
    passwordHash,
    isAdmin: true
  })

  const userDan = em.create(User, {
    id: '2',
    name: 'Dan',
    tag: '0001',
    email: 'dan@joincomet.app',
    passwordHash,
    isAdmin: true
  })

  const userMichael = em.create(User, {
    id: '3',
    name: 'Michael',
    tag: '0001',
    email: 'michael@joincomet.app',
    passwordHash,
    isAdmin: true
  })

  const serverComet = em.create(Server, {
    name: 'Comet',
    description: 'Official announcements and discussion relating to Comet.',
    isFeatured: true,
    isPublic: true,
    featuredPosition: Lexico.FIRST_POSITION,
    owner: userDan,
    category: ServerCategory.Meta,
    avatarUrl: 'https://avatars.githubusercontent.com/u/53412679?s=200&v=4'
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
    em.create(ServerUserJoin, { user: userMichael, server: serverComet }),
    em.create(ServerFolder, {
      server: serverComet,
      folder: createFolder(
        'Announcements',
        userDan,
        'All official Comet announcements'
      )
    }),
    em.create(FriendData, {
      user: userDan,
      toUser: userMichael,
      status: FriendStatus.Friends,
      showChat: true
    }),
    em.create(FriendData, {
      user: userMichael,
      toUser: userDan,
      status: FriendStatus.Friends,
      showChat: true
    })
  )

  const users: User[] = []
  for (let i = 0; i < NUM_USERS; i++) {
    const user = em.create(User, {
      id: `${i + 4}`,
      name: faker.name.firstName(),
      tag: tagGenerator(),
      passwordHash,
      email: faker.internet.email(),
      avatarUrl:
        rand(1, 2) === 1
          ? faker.image.imageUrl(80, 80, undefined, false, true)
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
    const createdAt = faker.date.recent()
    for (let j = 0; j < numMessages; j++) {
      const message = em.create(Message, {
        author: user,
        channel: channelGeneral,
        createdAt: new Date(createdAt.getTime() + j * 1000),
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
      voteCount: rand(1, 100),
      commentCount: 2
    } as Post
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
          image: faker.image.imageUrl(96, 64, undefined, false, true),
          logo: faker.image.imageUrl(16, 16, undefined, false, true),
          url,
          twitterCard: 'summary_large_image'
        }
      })
    } else if (n === 3) {
      // Image
      const numImages = rand(1, 3)
      const imageUrls = []
      for (let j = 0; j < numImages; j++) {
        imageUrls.push(faker.image.imageUrl(96, 64, undefined, false, true))
      }
      post = em.create(Post, {
        ...postData,
        imageUrls
      })
    }

    const comment1 = em.create(Comment, {
      post,
      author: user,
      text: faker.lorem.sentences(),
      voteCount: 1
    })
    const comment2 = em.create(Comment, {
      post,
      author: user,
      text: faker.lorem.sentences(),
      parentComment: comment1,
      voteCount: 1
    })

    entities.push(post, comment1, comment2)
  }

  entities.push(...users)
  await em.persistAndFlush(entities)
}
