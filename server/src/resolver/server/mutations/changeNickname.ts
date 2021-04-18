import { Field, ID, InputType } from 'type-graphql'
import { Length } from 'class-validator'
import { Context } from '@/types'
import { ServerPermission, ServerUser, ServerUserStatus } from '@/entity'

@InputType()
export class ChangeNicknameInput {
  @Field(() => ID)
  serverId: string

  @Field(() => ID, { nullable: true })
  userId?: string

  @Field({ nullable: true })
  @Length(1, 1000)
  nickname?: string
}

export async function changeNickname(
  { em, user, liveQueryStore }: Context,
  { serverId, userId, nickname }: ChangeNicknameInput
): Promise<ServerUser> {
  const serverUser = await em.findOneOrFail(ServerUser, {
    user: userId,
    server: serverId,
    status: ServerUserStatus.Joined
  })
  if (!userId || user.id === userId)
    await user.checkServerPermission(
      em,
      serverId,
      ServerPermission.ChangeNickname
    )
  else
    await user.checkServerPermission(
      em,
      serverId,
      ServerPermission.ManageNicknames
    )
  serverUser.nickname = nickname
  await em.persistAndFlush(serverUser)
  liveQueryStore.invalidate(`User:${userId}`)
  return serverUser
}
