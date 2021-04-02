import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core'
import { Folder, User } from '@/entity'
import { Lexico } from '@/util'

@Entity()
export class UserFolder {
  @ManyToOne({ entity: () => User, primary: true })
  user: User

  @ManyToOne({ entity: () => Folder, primary: true })
  folder: Folder;

  [PrimaryKeyType]: [string, string]

  @Property({ columnType: 'text' })
  position: string = Lexico.FIRST_POSITION
}
