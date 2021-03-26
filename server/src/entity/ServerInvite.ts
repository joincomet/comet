import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { Field, ID, ObjectType } from 'type-graphql'
import { customAlphabet } from 'nanoid'
import { Server, User } from '@/entity'
import { ServerInviteDuration } from '@/resolver/server'

const nanoid = customAlphabet(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  8
)

@ObjectType()
@Entity()
export class ServerInvite {
  @Field(() => ID)
  @PrimaryKey()
  id: string = nanoid()

  @Field()
  @Property()
  createdAt: Date = new Date()

  @Field(() => ServerInviteDuration)
  @Enum({
    items: () => ServerInviteDuration
  })
  duration: ServerInviteDuration = ServerInviteDuration.Day

  @Field({ nullable: true })
  @Property({ nullable: true })
  maxUses?: number

  @Field()
  @Property()
  uses: number = 0

  @Field()
  @Property()
  isRevoked: boolean = false

  @Field()
  get expired(): boolean {
    if (this.maxUses && this.uses >= this.maxUses) return true
    if (this.duration === ServerInviteDuration.Never) return false
    return new Date().getTime() > this.createdAt.getTime() + this.duration
  }

  @Field(() => Server)
  @ManyToOne(() => Server)
  server: Server

  @ManyToOne(() => User)
  creator: User
}
