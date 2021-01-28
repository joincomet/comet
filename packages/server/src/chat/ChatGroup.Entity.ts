import {
  OneToOne,
  JoinColumn,
  Entity,
  ManyToMany,
  JoinTable,
  RelationId,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn
} from 'typeorm'
import { ChatChannel } from '@/chat/ChatChannel.Entity'
import { Field, ID, ObjectType } from 'type-graphql'
import { Lazy } from '@/Lazy'
import { User } from '@/user/User.Entity'

@ObjectType()
@Entity()
export class ChatGroup {
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

  @OneToOne(() => ChatChannel)
  @JoinColumn()
  channel: Lazy<ChatChannel>

  @Column()
  channelId: number

  @ManyToMany(() => User, user => user.chatGroups)
  @JoinTable()
  users: Lazy<User[]>

  @RelationId((group: ChatGroup) => group.users)
  userIds: number[]
}
