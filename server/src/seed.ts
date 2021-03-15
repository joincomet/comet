import { EntityManager } from '@mikro-orm/postgresql'
import {
  Channel,
  Folder,
  FriendRelationship,
  Message,
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

export const seed = async (em: EntityManager) => {
  const createFolder = (name: string, description?: string) =>
    em.create(Folder, { name, description })

  const createUserFolders = (user: User) => [
    em.create(UserFolder, {
      user,
      folder: createFolder('Favorites')
    }),
    em.create(UserFolder, {
      user,
      folder: createFolder('Read Later')
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
    owner: userDan
  })

  const channelGeneral = em.create(Channel, {
    name: 'general',
    description: 'General discussion relating to Comet',
    server: serverComet
  })

  entities.push(
    ...[
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
          'All official Comet announcements'
        )
      }),
      em.create(FriendRelationship, {
        user1: userDan,
        user2: userMichael
      })
    ]
  )

  const users: User[] = []
  for (let i = 0; i < NUM_USERS; i++) {
    const user = em.create(User, {
      name: faker.name.firstName(),
      tag: tagGenerator(),
      passwordHash,
      email: faker.internet.email()
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
    const numMessages = Math.floor(
      Math.random() * Math.floor(MAX_MESSAGES_PER_USER)
    )
    for (let j = 0; j < numMessages; j++) {
      const message = em.create(Message, {
        author: user,
        channel: channelGeneral,
        createdAt: faker.date.recent(),
        text: faker.lorem.paragraph()
      })
      entities.push(message)
    }
  }

  entities.push(...users)
  await em.persistAndFlush(entities)
}
