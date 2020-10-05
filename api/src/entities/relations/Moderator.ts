import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn
} from 'typeorm'
import { Lazy } from '@/Lazy'
import { User } from '@/entities/User'
import { Post } from '@/entities/Post'
import { Community } from '@/entities/Community'
import { ModPermission } from '@/types/ModPermission'

@ObjectType()
@Entity()
export class Moderator {
  @ManyToOne(() => User, user => user.moderatedCommunities)
  user: Lazy<User>

  @Field(() => ID)
  @PrimaryColumn('bigint')
  userId: number

  @ManyToOne(() => Community, community => community.moderators)
  community: Lazy<Community>

  @Field(() => ID)
  @PrimaryColumn('bigint')
  communityId: number

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @Field(() => [ModPermission])
  @Column('text', { array: true })
  permissions: ModPermission[]
}
