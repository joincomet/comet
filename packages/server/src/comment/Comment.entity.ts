import { Field, ID, Int, ObjectType } from 'type-graphql'
import { Post } from '@/post/Post.entity'
import { User } from '@/user/User.entity'
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property
} from '@mikro-orm/core'
import { NativeBigIntType } from '@/NativeBigIntType'
import { EditableEntity } from '@/Editable.entity'

@ObjectType()
@Entity()
export class Comment extends EditableEntity {
  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  author: User

  @ManyToOne({ entity: () => User, nullable: true })
  post: Post

  @Field()
  @Property('text')
  textContent: string

  @Field(() => ID, { nullable: true })
  @Property({ nullable: true, type: NativeBigIntType })
  parentCommentId: bigint

  @ManyToMany(() => User)
  rocketers = new Collection<User>(this)

  @Field(() => Int)
  @Property({ default: 1 })
  rocketCount: number

  @Field()
  isRocketed: boolean

  @Field()
  @Property({ default: false })
  pinned: boolean

  @Field({ nullable: true })
  @Property({ nullable: true })
  pinRank?: number
}
