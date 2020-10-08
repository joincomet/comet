import { Field, ID, ObjectType } from 'type-graphql'
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { Lazy } from '@/Lazy'
import { User } from '@/entities/User'
import { Community } from '@/entities/Community'

@ObjectType()
@Entity()
export class CommunityUser {
  @ManyToOne(() => User, user => user.communities)
  user: Lazy<User>

  @Field(() => ID)
  @PrimaryColumn('bigint')
  userId: number

  @ManyToOne(() => Community, community => community.users, {
    onDelete: 'CASCADE'
  })
  community: Lazy<Community>

  @Field(() => ID)
  @PrimaryColumn('bigint')
  communityId: number

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
