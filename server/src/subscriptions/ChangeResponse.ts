import { ClassType, Field, ObjectType } from 'type-graphql'

export default function ChangeResponse<TItem>(TItemClass: ClassType<TItem>) {
  @ObjectType({ isAbstract: true })
  abstract class ChangeResponseClass {
    @Field(() => TItemClass, { nullable: true })
    added?: TItem

    @Field(() => TItemClass, { nullable: true })
    updated?: TItem

    @Field(() => TItemClass, { nullable: true })
    deleted?: TItem
  }
  return ChangeResponseClass
}
