import { Field, ID, InputType } from 'type-graphql'
import { IsEmail, Length } from 'class-validator'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import {
  Comment,
  Message,
  Post,
  Relationship,
  RelationshipStatus,
  ServerUser,
  ServerUserStatus,
  User
} from '@/entity'
import { Context } from '@/types'
import { uploadImageSingle } from '@/util'

@InputType()
export class UpdateAccountInput {
  @Field(() => ID)
  userId: string

  @Field({ nullable: true })
  @Length(2, 32)
  name?: string

  @Field({ nullable: true })
  @IsEmail()
  email?: string

  @Field(() => GraphQLUpload, { nullable: true })
  avatarFile?: FileUpload

  @Field(() => RelationshipStatus, { nullable: true })
  relationshipStatus?: RelationshipStatus

  @Field({ defaultValue: false })
  isBannedGlobal: boolean = false

  @Field({ defaultValue: false })
  purge: boolean = false

  @Field({ nullable: true })
  banGlobalReason?: string

  @Field({ defaultValue: false })
  isUnbannedGlobal: boolean = false

  @Field({ defaultValue: false })
  isDeleted: boolean = false

  @Field({ nullable: true })
  isRead?: boolean

  @Field({ nullable: true })
  showChat?: boolean
}

export async function updateAccount(
  { em, user: currentUser, liveQueryStore }: Context,
  {
    userId,
    isUnbannedGlobal,
    banGlobalReason,
    isBannedGlobal,
    isDeleted,
    avatarFile,
    name,
    email,
    purge,
    relationshipStatus,
    isRead,
    showChat
  }: UpdateAccountInput
): Promise<User> {
  const user = await em.findOneOrFail(User, userId)

  if (isDeleted || avatarFile || name || email) {
    if (user.id !== currentUser.id)
      throw new Error('Must be current user to modify those fields')
    em.assign(user, {
      isDeleted,
      name: name ?? user.name,
      email: email ?? user.email, // TODO verify email
      avatarUrl: avatarFile
        ? await uploadImageSingle(avatarFile, { width: 256, height: 256 })
        : user.avatarUrl
    })
    await em.persistAndFlush(user)
    liveQueryStore.invalidate(`User:${userId}`)
  }

  if (isUnbannedGlobal || banGlobalReason || isBannedGlobal || purge) {
    if (!currentUser.isAdmin)
      throw new Error('Must be global admin to manage global bans')
    if (isBannedGlobal) {
      user.isBanned = true
      await em
        .createQueryBuilder(ServerUser)
        .update({ status: ServerUserStatus.None })
        .where({ user, status: ServerUserStatus.Joined })
        .execute()
      if (purge) {
        await em
          .createQueryBuilder(Post)
          .update({ isDeleted: true })
          .where({ author: user })
          .execute()
        await em
          .createQueryBuilder(Comment)
          .update({ isDeleted: true })
          .where({ author: user })
          .execute()
        await em
          .createQueryBuilder(Message)
          .update({ isDeleted: true })
          .where({ author: user })
          .execute()
      }
    }
    if (banGlobalReason) user.banReason = banGlobalReason
    if (isUnbannedGlobal) user.isBanned = false
    await em.persistAndFlush(user)
    liveQueryStore.invalidate(`User:${userId}`)
  }

  if (relationshipStatus || isRead || showChat) {
    let myData = await em.findOne(Relationship, {
      owner: currentUser,
      user
    })
    if (!myData) myData = em.create(Relationship, { owner: currentUser, user })
    let theirData = await em.findOne(Relationship, {
      owner: user,
      user: currentUser
    })
    if (!theirData)
      theirData = em.create(Relationship, { owner: user, user: currentUser })

    if (isRead != null) {
      myData.lastViewAt = new Date()
      myData.unreadCount = 0
    }

    if (showChat != null) {
      myData.showChat = showChat
    }

    if (relationshipStatus) {
      if (
        ![
          RelationshipStatus.Blocking,
          RelationshipStatus.FriendRequestOutgoing,
          RelationshipStatus.None
        ].includes(relationshipStatus)
      )
        throw new Error(
          'relationshipStatus can only be Blocking, FriendRequestOutgoing, or None'
        )
      let theirStatus
      let myStatus
      if (relationshipStatus === RelationshipStatus.FriendRequestOutgoing) {
        if (theirData.status === RelationshipStatus.Blocking)
          throw new Error('This user is blocking you')
        if (theirData.status === RelationshipStatus.Friends)
          throw new Error('You are already friends with this user')
        myStatus = relationshipStatus
        theirStatus = RelationshipStatus.FriendRequestIncoming
      } else if (relationshipStatus === RelationshipStatus.Blocking) {
        if (myData.status === RelationshipStatus.Blocking)
          throw new Error('You are already blocking this user')
        myStatus = relationshipStatus
        if (theirData.status !== RelationshipStatus.Blocking)
          theirData.status = RelationshipStatus.Blocked
      } else if (relationshipStatus === RelationshipStatus.None) {
        myStatus = relationshipStatus
        if (theirData.status !== RelationshipStatus.Blocking)
          theirData.status = relationshipStatus
      }
      myData.status = myStatus
      theirData.status = theirStatus
      const updatedAt = new Date()
      myData.updatedAt = updatedAt
      theirData.updatedAt = updatedAt
    }
    await em.persistAndFlush([myData, theirData, user])
    liveQueryStore.invalidate([`User:${userId}`, `User:${currentUser.id}`])
  }
  return user
}
