import { Field, ID, ObjectType } from 'type-graphql'
import { User } from './User'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  Tree,
  TreeChildren,
  TreeParent
} from 'typeorm'
import { Lazy } from '../lazy'
import { Post } from './Post'
import { CommentEndorsement } from './CommentEndorsement'

@ObjectType()
@Entity()
@Tree('materialized-path')
export class Comment {
  @Field(() => ID)
  @PrimaryColumn('varchar', { length: 20 })
  id: string

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.comments)
  author: Lazy<User>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  authorId: string

  @Field(() => Post, { nullable: true })
  @ManyToOne(() => Post, (post) => post.comments)
  post: Lazy<Post>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  postId: string

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  rootCommentId: string

  @Field()
  @Column('text')
  textContent: string

  @Field()
  @Column()
  createdAt: Date

  @Field({ nullable: true })
  @Column({ nullable: true })
  editedAt?: Date

  @Field(() => Comment, { nullable: true })
  @TreeParent()
  parentComment: Lazy<Comment>

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  parentCommentId: string

  @TreeChildren()
  childComments: Lazy<Comment[]>

  @OneToMany(() => CommentEndorsement, (endorsement) => endorsement.comment)
  endorsements: Lazy<CommentEndorsement[]>

  @Field()
  @Column({ default: 0 })
  endorsementCount: number

  personalEndorsementCount: number

  @Field()
  isEndorsed: boolean

  @Column({ default: false })
  deleted: boolean

  @Column({ default: false })
  removed: boolean

  @Column({ nullable: true })
  removedReason?: string

  @Field({ nullable: true })
  level?: number
}
