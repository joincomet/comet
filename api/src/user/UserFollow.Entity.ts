import { Field, ID, ObjectType } from 'type-graphql'
import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Lazy } from '@/Lazy'
import { User } from '@/user/User.Entity'

@ObjectType()
@Entity()
export class UserFollow {
  @ManyToOne(() => User, user => user.followTo)
  from: Lazy<User>

  @Field(() => ID)
  @PrimaryColumn('bigint')
  fromId: number

  @ManyToOne(() => User, user => user.followFrom)
  to: Lazy<User>

  @Field(() => ID)
  @PrimaryColumn('bigint')
  toId: number

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date
}
