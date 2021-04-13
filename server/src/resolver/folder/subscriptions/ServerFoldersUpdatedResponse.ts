import { Field, ID, ObjectType } from 'type-graphql'
import { Folder } from '@/entity'

@ObjectType()
export class ServerFoldersUpdatedResponse {
  @Field(() => ID)
  serverId: string

  @Field(() => [Folder])
  folders: Folder[]
}
