import { BaseEntity } from '@/Base.entity'
import { Field } from 'type-graphql'
import { Property } from '@mikro-orm/core'
import dayjs from 'dayjs'

export abstract class EditableEntity extends BaseEntity {
  @Field({ nullable: true })
  @Property({ nullable: true })
  editedAt?: Date

  @Field({ nullable: true })
  get timeSinceEdited(): string | null {
    if (!this.editedAt) return null
    // @ts-ignore
    return dayjs(new Date(this.editedAt)).twitter()
  }

  @Field({ nullable: true })
  get timeSinceEditedFull(): string | null {
    if (!this.editedAt) return null
    return dayjs(new Date(this.editedAt)).format('dddd, MMMM D, YYYY h:mm A')
  }

  @Field()
  @Property({ default: false })
  deleted: boolean

  @Field()
  @Property({ default: false })
  removed: boolean

  @Field({ nullable: true })
  @Property({ nullable: true })
  removedReason?: string
}
