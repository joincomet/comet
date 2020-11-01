import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn
} from 'typeorm'
import { Lazy } from '@/Lazy'
import { User } from '@/user/User.Entity'
import { Post } from '@/post/Post.Entity'
import { Planet } from '@/planet/Planet.Entity'
import { ModPermission } from '@/moderation/ModPermission'

@ObjectType()
@Entity()
export class PlanetAllowedPoster {
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
