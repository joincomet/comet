import { ArgsType, Field, ID, Publisher } from 'type-graphql'
import { Length } from 'class-validator'
import { ServerCategory } from '@/resolver/server'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Context } from '@/types'
import { UserServerPayload } from '@/resolver/server/subscriptions/UserServerPayload'
import { Server } from '@/entity'
import { CreateServerArgs } from '@/resolver/server/mutations/createServer'
import { uploadImageSingle } from '@/util'

@ArgsType()
export class EditServerArgs {
  @Field(() => ID)
  serverId: string

  @Field({ nullable: true })
  @Length(2, 100)
  name?: string

  @Field({ nullable: true })
  @Length(0, 500)
  description?: string

  @Field({ nullable: true })
  isPublic?: boolean

  @Field(() => ServerCategory, { nullable: true })
  category?: ServerCategory

  @Field(() => GraphQLUpload, { nullable: true })
  avatarFile?: FileUpload

  @Field(() => GraphQLUpload, { nullable: true })
  bannerFile?: FileUpload
}

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
