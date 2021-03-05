import { Field, ObjectType } from 'type-graphql'
import { Comment } from '@/entity/Comment'
import { User } from '@/entity/User'
import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { BaseEntity } from '@/entity/BaseEntity'

@ObjectType({ implements: BaseEntity })
@Entity()
export class Notification extends BaseEntity {
  @Field(() => User)
  @ManyToOne(() => User)
  user: User

  @Field(() => Comment)
  @ManyToOne(() => Comment)
  comment: Comment

  @Field()
  @Property({ default: false })
  read: boolean
}
