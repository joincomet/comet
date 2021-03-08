import { AuthChecker } from 'type-graphql'
import { Context } from '@/types'
import {
  ChatChannel,
  ChatGroup,
  ChatMessage,
  Comment,
  Post,
  Server,
  User
} from '@/entity'
import { ServerPermission } from '@/types/ServerPermission'
import { ChannelPermission } from '@/types/ChannelPermission'

/*
@Authorized(): must be logged in
@Authorized('ADMIN'): must be admin
@Authorized('USER'): must be same user as user being queried (i.e. email)
@Authorized('AUTHOR'): must be author of post, comment or message
@Authorized('OWNER'): must be server or group owner
@Authorized('GROUP'): must be in group
@Authorized(ServerPermission.Perm): must have given ServerPermission
@Authorized([ChannelPermission.Perm, ServerPermission.Perm]): must have given ChannelPermission or ServerPermission
 */

export enum Auth {
  Admin = 'ADMIN',
  User = 'USER',
  Author = 'AUTHOR',
  Owner = 'OWNER',
  Group = 'GROUP'
}

export const authChecker: AuthChecker<Context> = async (
  {
    root,
    args: { serverId, channelId, commentId, postId, messageId, groupId },
    context: { em, user }
  },
  roles
): Promise<boolean> => {
  if (!user) return false
  if (!roles || roles.length === 0) return true

  if (user.admin) return true

  if (roles[0] === Auth.Admin) return user.admin

  if (roles[0] === Auth.User) {
    if (!root || !(root instanceof User))
      throw new Error(
        `'${Auth.User}' authorization can only be used on User entity`
      )

    return user === root
  }

  if (roles[0] === Auth.Author) {
    if (!commentId && !postId && !messageId)
      throw new Error(
        `'${Auth.Author}' authorization must be used with commentId, postId, or messageId`
      )

    if (commentId) {
      const comment = await em.findOneOrFail(Comment, commentId)
      return comment.author === user
    } else if (postId) {
      const post = await em.findOneOrFail(Post, postId)
      return post.author === user
    } else if (messageId) {
      const message = await em.findOneOrFail(ChatMessage, messageId)
      return message.author === user
    } else {
      return false
    }
  }

  if (roles[0] === Auth.Owner) {
    if (!serverId && !groupId)
      throw new Error(
        `'${Auth.Owner}' authorization must be used with serverId or groupId`
      )

    if (serverId) {
      const server = await em.findOneOrFail(Server, serverId)
      return server.owner === user
    } else if (groupId) {
      const group = await em.findOneOrFail(ChatGroup, groupId)
      return group.owner === user
    } else return false
  }

  if (roles[0] === Auth.Group) {
    if (!groupId)
      throw new Error(`'${Auth.Group}' authorization must be used with groupId`)

    const group = await em.findOneOrFail(ChatGroup, groupId)
    return group.users.contains(user)
  }

  if (roles.length === 1) {
    if (!serverId && !postId && !commentId && !messageId) return true

    let server
    if (serverId) server = await em.findOneOrFail(Server, serverId)
    else if (postId) server = (await em.findOneOrFail(Post, ['server'])).server
    else if (commentId)
      server = (await em.findOneOrFail(Comment, ['post.server'])).post.server
    else if (messageId)
      server = (await em.findOneOrFail(ChatMessage, ['channel.server'])).channel
        .server
    else return false
    return user.hasServerPermission(em, ServerPermission[roles[0]], server)
  }

  if (roles.length === 2) {
    if (!channelId && !messageId)
      throw new Error(
        'ChannelPermission must be used with channelId or messageId'
      )

    let channel
    if (channelId) channel = await em.findOneOrFail(ChatChannel, channelId)
    else if (messageId)
      channel = (await em.findOneOrFail(ChatMessage, messageId)).channel
    else return false
    return user.hasChannelPermission(
      em,
      ChannelPermission[roles[0]],
      ServerPermission[roles[1]],
      channel
    )
  }

  return false
}
