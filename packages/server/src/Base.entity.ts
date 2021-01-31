import { Field, ID } from 'type-graphql'
import { PrimaryKey, Property } from '@mikro-orm/core'
import { NativeBigIntType } from '@/NativeBigIntType'
import dayjs from 'dayjs'

export abstract class BaseEntity {
  @Field(() => ID)
  @PrimaryKey({ type: NativeBigIntType })
  readonly id: bigint

  @Field()
  get id36(): string {
    return this.id.toString(36)
  }

  @Field()
  @Property()
  createdAt: Date = new Date()

  @Field()
  get timeSince(): string {
    // @ts-ignore
    return dayjs(new Date(this.createdAt)).twitter()
  }

  @Field()
  get timeSinceFull(): string {
    return dayjs(new Date(this.createdAt)).format('dddd, MMMM D, YYYY h:mm A')
  }
}
