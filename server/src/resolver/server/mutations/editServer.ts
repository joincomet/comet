import { ArgsType, Field, ID, Publisher } from 'type-graphql'
import { Length } from 'class-validator'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Context } from '@/types'
import { Server, ServerCategory } from '@/entity'
import { uploadImageSingle } from '@/util'

export async function editServer(
  { em }: Context,
  {
    serverId,
    name,
    description,
    isPublic,
    category,
    avatarFile,
    bannerFile
  }: EditServerArgs,
  notifyServerUpdated: Publisher<{ serverId: string }>
): Promise<Server> {
  const server = await em.findOneOrFail(Server, serverId)
  em.assign(server, {
    name: name ?? server.name,
    description: description ?? server.description,
    avatarUrl: avatarFile
      ? await uploadImageSingle(
          avatarFile,
          {
            width: 256,
            height: 256
          },
          true
        )
      : server.avatarUrl,
    bannerUrl: bannerFile
      ? await uploadImageSingle(bannerFile, null, false)
      : server.bannerUrl,
    category: category ?? server.category,
    isPublic: isPublic ?? server.isPublic
  })
  await em.persistAndFlush(server)
  await notifyServerUpdated({ serverId: server.id })
  return server
}
