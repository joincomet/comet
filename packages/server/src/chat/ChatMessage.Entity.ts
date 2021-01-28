import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { User } from '@/user/User.Entity'
import dayjs from 'dayjs'
import { ChatChannel } from '@/chat/ChatChannel.Entity'
import { Lazy } from '@/Lazy'

@ObjectType()
@Entity()
export class ChatMessage {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  readonly id: number

  @Field(() => User)
  @ManyToOne(() => User)
  author: Promise<User>

  @Field(() => ID)
  @Column()
  authorId: number

  @Field()
  @Column('text')
  text: string

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @Field()
  get timeSince(): string {
    // @ts-ignore
    return dayjs(new Date(this.createdAt)).twitter()
  }

  @Field({ nullable: true })
  @Column({ nullable: true })
  editedAt?: Date

  @Field({ nullable: true })
  get timeSinceEdited(): string | null {
    if (!this.editedAt) return null
    // @ts-ignore
    return dayjs(new Date(this.editedAt)).twitter()
  }

  @Field(() => ID)
  @Column()
  channelId: number

  @ManyToOne(() => ChatChannel, channel => channel.messages)
  channel: Lazy<ChatChannel>

  @Field()
  @Column({ default: false })
  pinned: boolean
}
