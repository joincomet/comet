import { Context } from '@/types'
import {
  FolderVisibility,
  RelationshipStatus,
  ServerUserStatus,
  User
} from '@/entity'
import { Field, ObjectType } from 'type-graphql'

export async function user(
  { em, user: currentUser }: Context,
  userId: string
): Promise<User> {
  let user: User
  if (currentUser)
    await em.populate(currentUser, ['relationships.user', 'servers.server'])
  if (!userId || userId === currentUser?.id) {
    // Current user
    if (!currentUser) return null
    user = await em.findOneOrFail(User, currentUser.id, [
      'relationships.user',
      'groups.users',
      'servers.roles.channelPermissions.channel',
      'servers.server',
      'servers.server.serverFolders.folder',
      'servers.server.owner',
      'servers.server.roles',
      'userFolders.folder'
    ])
    user.folders = user.userFolders
      .getItems()
      .map(uf => uf.folder)
      .filter(f => !f.isDeleted)
  } else {
    // Other user
    if (!currentUser) throw new Error('Must be authorized')
    user = await em.findOneOrFail(User, userId, [
      'relationships.user',
      'servers.server',
      'userFolders.folder'
    ])

    const isFriends = !!user.relationships
      .getItems()
      .find(
        rel =>
          rel.user === currentUser && rel.status === RelationshipStatus.Friends
      )

    user.folders = user.userFolders
      .getItems()
      .map(uf => uf.folder)
      .filter(
        f =>
          !f.isDeleted &&
          (f.visibility === FolderVisibility.Public ||
            (isFriends ? f.visibility === FolderVisibility.Friends : false))
      )

    const currentFriends = currentUser.relationships
      .getItems()
      .filter(rel => rel.status === RelationshipStatus.Friends)
      .map(rel => rel.user)
    const mutualFriends = user.relationships
      .getItems()
      .filter(
        relationship =>
          relationship.status === RelationshipStatus.Friends &&
          currentFriends.includes(relationship.user)
      )
    user.relationships.set(mutualFriends)

    const currentServers = currentUser.servers
      .getItems()
      .filter(su => su.status === ServerUserStatus.Joined)
      .map(su => su.server)
    const mutualServers = user.servers
      .getItems()
      .filter(
        su =>
          su.status === ServerUserStatus.Joined &&
          currentServers.includes(su.server)
      )
    user.servers.set(mutualServers)
  }

  return user
}
