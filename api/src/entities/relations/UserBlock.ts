import { Field, ID, ObjectType } from 'type-graphql'
import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Lazy } from '@/Lazy'
import { User } from '@/entities/User'

@ObjectType()
@Entity()
export class BlockedUser {
  @ManyToOne(() => User, user => user.blockedBy)
  fromUser: Lazy<User>

  @Field(() => ID)
  @PrimaryColumn('bigint')
  fromUserId: number

  @ManyToOne(() => User, user => user.blocking)
  toUser: Lazy<User>

  @Field(() => ID)
  @PrimaryColumn('bigint')
  toUserId: number

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date
}
