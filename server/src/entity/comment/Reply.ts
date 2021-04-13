import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Comment, Post, User } from '@/entity'
import { Entity, ManyToOne, Property } from '@mikro-orm/core'

@ObjectType({ implements: BaseEntity })
@Entity()
export class Reply extends BaseEntity {
  @ManyToOne(() => User)
  toUser: User

  @Field(() => User)
  @ManyToOne(() => User)
  fromUser: User

  @Field(() => Comment)
  @ManyToOne(() => Comment)
  comment: Comment

  @Field(() => Comment, { nullable: true })
  @ManyToOne(() => Comment, { nullable: true })
  parentComment?: Comment

  @Field(() => Post)
  @ManyToOne(() => Post)
  post: Post

  @Field()
  @Property()
  isRead: boolean = false
}
