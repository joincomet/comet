import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { Lazy } from '../lazy'
import { Planet } from './Planet'

@ObjectType()
@Entity()
export class Galaxy {
  @Field(() => ID)
  @PrimaryColumn()
  name: string

  @Field()
  @Column()
  fullName: string

  @Field()
  @Column()
  icon: string

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  description?: string

  @OneToMany(() => Planet, (planet) => planet.galaxy)
  planets: Lazy<Planet[]>

  @Field({ nullable: true })
  planetCount: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  bannerImageUrl?: string
}
