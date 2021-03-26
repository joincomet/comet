import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core'
import { Folder, Server } from '@/entity'
import { Lexico } from '@/util'

@Entity()
export class ServerFolder {
  @ManyToOne({ entity: () => Server, primary: true })
  server: Server

  @ManyToOne({ entity: () => Folder, primary: true })
  folder: Folder;

  [PrimaryKeyType]: [string, string]

  @Property({ columnType: 'text' })
  position: string = Lexico.FIRST_POSITION
}
