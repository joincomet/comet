import { EntityManager } from '@mikro-orm/postgresql'
import {
  Channel,
  Folder,
  Message,
  MessageType,
  Role,
  Server,
  ServerCategory,
  ServerFolder,
  ServerUser,
  User,
  UserFolder
} from '@/entity'
import { ReorderUtils } from '@/util'
import * as argon2 from 'argon2'

export async function seed(em: EntityManager) {
  let cometServer = await em.findOne(Server, { name: 'Comet' })
  if (!cometServer) {
    const cometUser = em.create(User, {
      username: 'Comet',
      isAdmin: true,
      avatarUrl: 'https://media.joincomet.app/sQAofmn1NgoJiTCVfz9D3.png',
      passwordHash: await argon2.hash(
        process.env.COMET_USER_PASSWORD || 'password'
      )
    })

    cometServer = em.create(Server, {
      name: 'Comet',
      displayName: 'Comet',
      description: 'Official discussion and announcements relating to Comet',
      category: ServerCategory.Meta,
      avatarUrl: 'https://media.joincomet.app/sQAofmn1NgoJiTCVfz9D3.png',
      bannerUrl: 'https://media.joincomet.app/LKpM4IRyEmRTi49MGxgoQ.png',
      isFeatured: true,
      featuredPosition: ReorderUtils.FIRST_POSITION,
      owner: cometUser
    })
    const defaultRole = em.create(Role, {
      name: 'Default',
      server: cometServer,
      isDefault: true
    })
    const cometServerUser = em.create(ServerUser, {
      server: cometServer,
      user: cometUser,
      role: defaultRole
    })

    const generalChannel = em.create(Channel, {
      name: 'general',
      server: cometServer,
      isDefault: true
    })
    const initialMessage = em.create(Message, {
      channel: generalChannel,
      type: MessageType.Initial,
      author: cometUser
    })

    const announcementsFolder = em.create(Folder, {
      name: 'Announcements',
      server: cometServer
    })
    const announcementsServerFolder = em.create(ServerFolder, {
      server: cometServer,
      folder: announcementsFolder
    })

    const readLaterFolder = em.create(Folder, {
      name: 'Read Later',
      owner: cometUser
    })
    const favoritesFolder = em.create(Folder, {
      name: 'Favorites',
      owner: cometUser
    })
    const readLaterUserFolder = em.create(UserFolder, {
      user: cometUser,
      folder: readLaterFolder,
      position: ReorderUtils.positionAfter(ReorderUtils.FIRST_POSITION)
    })
    const favoritesUserFolder = em.create(UserFolder, {
      user: cometUser,
      folder: favoritesFolder
    })

    await em.persistAndFlush([
      cometUser,
      cometServer,
      generalChannel,
      initialMessage,
      defaultRole,
      announcementsFolder,
      announcementsServerFolder,
      cometServerUser,
      readLaterFolder,
      readLaterUserFolder,
      favoritesFolder,
      favoritesUserFolder
    ])
  }
}
