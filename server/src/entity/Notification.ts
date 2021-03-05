import { Field, ObjectType } from 'type-graphql'
import { Comment, User, BaseEntity } from '@/entity'
import { Entity, ManyToOne, Property } from '@mikro-orm/core'

@ObjectType({ implements: BaseEntity })
@Entity()
export class Notification extends BaseEntity {
  @ManyToOne(() => User)
  user: User

  @Field(() => Comment)
  @ManyToOne(() => Comment)
  comment: Comment

  @Field()
  @Property({ default: false })
  read: boolean
}
