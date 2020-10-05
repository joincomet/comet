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
export class AllowedPoster {
  @ManyToOne(() => User, user => user.allowedCommunities)
  user: Lazy<User>

  @Field(() => ID)
  @PrimaryColumn('bigint')
  userId: number

  @ManyToOne(() => Community, community => community.allowedPosters)
  community: Lazy<Community>

  @Field(() => ID)
  @PrimaryColumn('bigint')
  communityId: number

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date
}
