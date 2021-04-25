import { Field, InputType } from 'type-graphql'
import { IsEmail, Length } from 'class-validator'
import { Context } from '@/types'
import isEmail from 'validator/lib/isEmail'
import { CustomError } from '@/types/CustomError'
import { Folder, FolderVisibility, User, UserFolder } from '@/entity'
import {
  createAccessToken,
  handleUnderscore,
  ReorderUtils,
  tagGenerator
} from '@/util'
import * as argon2 from 'argon2'
import { LoginResponse } from '@/resolver/user/mutations/LoginResponse'
import { GraphQLEmailAddress } from 'graphql-scalars'

@InputType()
export class CreateAccountInput {
  @Field()
  @Length(2, 32)
  name: string

  @Field(() => GraphQLEmailAddress)
  @IsEmail()
  email: string

  @Field()
  @Length(6)
  password: string
}

export async function createAccount(
  ctx: Context,
  { name, email, password }: CreateAccountInput
): Promise<LoginResponse> {
  const { em, liveQueryStore } = ctx

  email = email.toLowerCase()
  if (!isEmail(email)) throw new Error('error.login.invalidEmail')

  name = name
    .replace(/ +(?= )/g, '') // remove repeated spaces
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // remove zero-width characters
    .trim() // remove leading and trailing whitespace
  if (name.length < 2 || name.length > 32)
    throw new Error('error.login.nameLength')

  const bannedSubstrings = ['@', '#', ':', '```']

  for (const s of bannedSubstrings) {
    if (name.includes(s)) throw new CustomError('error.login.illegalName', s)
  }

  const foundUser = await em.findOne(User, {
    email: handleUnderscore(email),
    isDeleted: false
  })
  if (foundUser) throw new Error('error.login.emailInUse')

  const passwordHash = await argon2.hash(password)

  let tag = tagGenerator()

  while (
    await em.findOne(User, {
      name: { $ilike: handleUnderscore(name) },
      tag,
      isDeleted: false
    })
  ) {
    tag = tagGenerator()
  }

  const user = em.create(User, {
    name,
    tag,
    passwordHash,
    lastLoginAt: new Date(),
    email
  })

  em.persist(
    em.create(UserFolder, {
      user,
      folder: em.create(Folder, {
        name: 'Favorites',
        owner: user,
        visibility: FolderVisibility.Private
      }),
      position: ReorderUtils.FIRST_POSITION
    })
  )

  em.persist(
    em.create(UserFolder, {
      user,
      folder: em.create(Folder, {
        name: 'Read Later',
        owner: user,
        visibility: FolderVisibility.Private
      }),
      position: ReorderUtils.positionAfter(ReorderUtils.FIRST_POSITION)
    })
  )

  await em.persistAndFlush(user)
  user.username = `${user.name}#${user.tag}`
  const accessToken = createAccessToken(user)
  liveQueryStore.invalidate(`Query.user`)
  ctx.userId = user.id
  return {
    accessToken,
    user
  } as LoginResponse
}
