import { Field, ID, ObjectType } from 'type-graphql'
import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Lazy } from '@/Lazy'
import { User } from '@/entities/User'
import { Post } from '@/entities/Post'
import {Community} from "@/entities/Community";

@ObjectType()
@Entity()
export class MutedCommunity {
  @ManyToOne(() => User, user => user.mutedCommunities)
  user: Lazy<User>

  @Field(() => ID)
  @PrimaryColumn('bigint')
  userId: number

  @ManyToOne(() => Community, community => community.mutes)
  community: Lazy<Community>

  @Field(() => ID)
  @PrimaryColumn('bigint')
  communityId: number

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date
}
