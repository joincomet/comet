import { Context } from '@/types'
import {
  FolderVisibility,
  RelationshipStatus,
  ServerUserStatus,
  User
} from '@/entity'

export async function user(
  { em, user: currentUser }: Context,
  userId: string
): Promise<User> {
  let user: User
  await em.populate(currentUser, ['relationships.user', 'servers.server'])
  if (!userId || currentUser?.id === userId) {
    // Current user
    user = await em.findOneOrFail(User, userId, [
      'relationships.user',
      'groups.users',
      'servers.roles.channelPermissions.channel',
      'servers.server.channels',
      'servers.server.folders',
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
      .filter(
        uf =>
          uf.visibility === FolderVisibility.Public ||
          (isFriends ? uf.visibility === FolderVisibility.Friends : false)
      )
      .map(uf => uf.folder)
      .filter(f => !f.isDeleted)

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
