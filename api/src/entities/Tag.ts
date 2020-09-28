import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Lazy } from '@/Lazy'
import { Community } from '@/entities/Community'

@ObjectType()
@Entity()
export class Tag {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  _id: number

  @Field()
  get id(): string {
    return this._id.toString(36)
  }

  @Field()
  @Column()
  name: string

  @ManyToMany(() => Community, (community) => community.tags)
  communities: Lazy<Community[]>
}
