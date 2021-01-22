import { ChatBase } from '@/chat/ChatBase'
import {
  OneToOne,
  JoinColumn,
  Entity,
  ManyToMany,
  JoinTable,
  RelationId,
  Column
} from 'typeorm'
import { ChatChannel } from '@/chat/ChatChannel.Entity'
import { ObjectType } from 'type-graphql'
import { Lazy } from '@/Lazy'
import { User } from '@/user/User.Entity'

@ObjectType()
@Entity()
export class ChatGroup extends ChatBase {
  @OneToOne(() => ChatChannel)
  @JoinColumn()
  channel: Lazy<ChatChannel>

  @Column()
  channelId: number

  @ManyToMany(() => User, user => user.chatGroups)
  @JoinTable()
  members: Lazy<User[]>

  @RelationId((group: ChatGroup) => group.members)
  memberIds: number[]
}
