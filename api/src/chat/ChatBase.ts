import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { User } from '@/user/User.Entity'
import dayjs from 'dayjs'
import { ChatMessage } from '@/chat/ChatMessage.Entity'
import { ChatChannel } from '@/chat/ChatChannel.Entity'
import { Lazy } from '@/Lazy'

@ObjectType()
export abstract class ChatBase {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  readonly id: number

  @Field(() => User)
  @ManyToOne(() => User)
  creator: Lazy<User>

  @Field(() => ID)
  @Column()
  creatorId: number

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  name: string

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  avatarUrl: string

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date
}
