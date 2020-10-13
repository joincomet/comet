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
import { Planet } from '@/entities/Planet'
import { ModPermission } from '@/types/planet/ModPermission'

@ObjectType()
@Entity()
export class AllowedPoster {
  @ManyToOne(() => User, user => user.allowedPlanets)
  user: Lazy<User>

  @Field(() => ID)
  @PrimaryColumn('bigint')
  userId: number

  @ManyToOne(() => Planet, planet => planet.allowedPosters)
  planet: Lazy<Planet>

  @Field(() => ID)
  @PrimaryColumn('bigint')
  planetId: number

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date
}
