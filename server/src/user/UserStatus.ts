import { Embeddable, Enum, Property } from '@mikro-orm/core'
import { Field, ObjectType } from 'type-graphql'
import { StatusDuration } from '@/user/StatusDuration'

@Embeddable()
@ObjectType()
export class UserStatus {
  constructor(duration: StatusDuration, status: string, emoji?: string) {
    this.duration = duration
    this.status = status
    this.emoji = emoji
  }

  @Field({ nullable: true })
  @Property({ nullable: true })
  status: string

  @Field({ nullable: true })
  @Property({ nullable: true })
  emoji?: string

  @Field({ nullable: true })
  @Property({ nullable: true })
  updatedAt: Date = new Date()

  @Field(() => StatusDuration)
  @Enum({ items: () => StatusDuration, default: StatusDuration.DAY })
  duration: StatusDuration = StatusDuration.DAY

  @Field()
  get expired(): boolean {
    if (!this.updatedAt) return true
    if (this.duration === StatusDuration.NEVER) return false
    return new Date().getTime() > this.updatedAt.getTime() + this.duration
  }
}
