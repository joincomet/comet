import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Lazy } from '@/Lazy'
import { User } from '@/entities/User'
import { Post } from '../Post'

@ObjectType()
@Entity()
export class Removal {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  readonly id: number

  @ManyToOne(() => User)
  mod: Lazy<User>

  @Field(() => ID)
  @Column('bigint')
  modId: number

  @ManyToOne(() => Post, { nullable: true })
  post?: Lazy<Post>

  @Field(() => ID, { nullable: true })
  @Column('bigint', { nullable: true })
  postId?: number

  @ManyToOne(() => Comment, { nullable: true })
  comment?: Lazy<Comment>

  @Field(() => ID, { nullable: true })
  @Column('bigint', { nullable: true })
  commentId?: number

  @Field()
  @Column()
  reason: string

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
