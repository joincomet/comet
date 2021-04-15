import { ClassType, Field, ObjectType } from 'type-graphql'

export default function BulkChangeResponse<TItem>(
  TItemClass: ClassType<TItem>
) {
  @ObjectType({ isAbstract: true })
  abstract class BulkChangeResponseClass {
    @Field(() => [TItemClass])
    added: TItem[] = []

    @Field(() => [TItemClass])
    updated: TItem[] = []

    @Field(() => [TItemClass])
    deleted: TItem[] = []
  }
  return BulkChangeResponseClass
}
