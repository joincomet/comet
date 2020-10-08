import { Field, ObjectType } from 'type-graphql'

@ObjectType()
class Usernames {
  @Field({ nullable: true })
  reddit?: string

  @Field({ nullable: true })
  snapchat?: string

  @Field({ nullable: true })
  instagram?: string

  @Field({ nullable: true })
  github?: string

  @Field({ nullable: true })
  twitch?: string

  @Field({ nullable: true })
  tumblr?: string

  @Field({ nullable: true })
  youtube?: string

  @Field({ nullable: true })
  steam?: string

  @Field({ nullable: true })
  facebook?: string

  @Field({ nullable: true })
  linkedin?: string

  @Field({ nullable: true })
  spotify?: string

  @Field({ nullable: true })
  discord?: string

  @Field({ nullable: true })
  twitter?: string

  @Field({ nullable: true })
  soundcloud?: string

  @Field({ nullable: true })
  tiktok?: string

  @Field({ nullable: true })
  vsco?: string
}

@ObjectType()
export class UserProfile {
  @Field({ nullable: true })
  realName?: string

  @Field({ nullable: true })
  website?: string

  @Field({ nullable: true })
  bio?: string

  @Field({ nullable: true })
  avatarURL?: string

  @Field({ nullable: true })
  usernames?: Usernames
}
