import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  RelationId
} from 'typeorm'
import { ChatChannel } from '@/chat/ChatChannel.Entity'
import { ChatBase } from '@/chat/ChatBase'
import { Lazy } from '@/Lazy'
import { User } from '@/user/User.Entity'

@ObjectType()
@Entity()
export class ChatServer extends ChatBase {
  @OneToMany(() => ChatChannel, channel => channel.server)
  channels: Lazy<ChatChannel[]>

  @Field(() => ID)
  @Column()
  defaultChannelId: number

  @ManyToMany(() => User, user => user.chatServers)
  @JoinTable()
  members: Lazy<User[]>

  @RelationId((server: ChatServer) => server.members)
  memberIds: number[]
}
