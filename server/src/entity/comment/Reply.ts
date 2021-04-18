import { Field, ObjectType } from 'type-graphql'
import { Comment, User } from '@/entity'
import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { BaseEntity } from '@/entity/BaseEntity'

@ObjectType({ implements: BaseEntity })
@Entity()
export class Reply extends BaseEntity {
  @ManyToOne(() => User)
  user: User

  @Field(() => Comment)
  @ManyToOne(() => Comment)
  comment: Comment

  @Field()
  @Property()
  isRead: boolean = false
}
