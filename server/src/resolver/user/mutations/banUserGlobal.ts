import { Context } from '@/types'
import { ArgsType, Field, ID, Publisher } from 'type-graphql'
import { Comment, Message, Post, ServerUser, User } from '@/entity'

@ArgsType()
export class BanUserGlobalArgs {
  @Field(() => ID)
  userId: string

  @Field({ defaultValue: false })
  purge: boolean

  @Field({ nullable: true })
  reason?: string
}

export async function banUserGlobal(
  { em }: Context,
  { userId, purge, reason }: BanUserGlobalArgs,
  notifyUserBannedGlobal: Publisher<{ userId: string }>
): Promise<boolean> {
  const user = await em.findOneOrFail(User, userId)
  await em
    .createQueryBuilder(User)
    .update({
      isBanned: true,
      banReason: reason
    })
    .where({ id: userId })
    .execute()
  await em.nativeDelete(ServerUser, { user })
  if (purge) {
    await em
      .createQueryBuilder(Post)
      .update({
        isDeleted: true
      })
      .where({ author: user })
      .execute()

    await em
      .createQueryBuilder(Comment)
      .update({
        isDeleted: true
      })
      .where({ author: user })
      .execute()

    await em
      .createQueryBuilder(Message)
      .update({
        isDeleted: true
      })
      .where({ author: user })
      .execute()
  }

  await notifyUserBannedGlobal({ userId })
  return true
}
