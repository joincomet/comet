import { Field, ObjectType } from 'type-graphql'
import { Comment } from '@/comment/Comment.Entity'
import { User } from '@/user/User.entity'
import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { BaseEntity } from '@/types/Base.entity'

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
