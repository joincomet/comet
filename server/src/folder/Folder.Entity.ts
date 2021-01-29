import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { ChatMessage } from '@/chat/ChatMessage.Entity'
import { Lazy } from '@/Lazy'
import { ChatGroup } from '@/chat/ChatGroup.Entity'
import { Planet } from '@/planet/Planet.Entity'
import { Post } from '@/post/Post.Entity'
import { Color } from '@/Color'
import { User } from '@/user/User.Entity'

@ObjectType()
@Entity()
export class Folder {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  readonly id: number

  @Field()
  @Column('text')
  name: string

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  description?: string

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @Field({ nullable: true })
  @Column({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatarUrl?: string

  @Field(() => Color)
  @Column({ type: 'enum', enum: Color, default: Color.blue })
  color: Color

  @Field(() => [Post])
  @ManyToMany(() => Post, post => post.folders)
  @JoinTable()
  posts: Promise<Post[]>

  @Field(() => User)
  @ManyToOne(() => User, user => user.folders)
  creator: Lazy<User>

  @Field(() => ID)
  @Column()
  creatorId: number

  @Field()
  @Column({ default: false })
  deleted: boolean
}
