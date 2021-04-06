import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKeyType,
  Property
} from '@mikro-orm/core'
import { Folder, Server } from '@/entity'
import { ReorderUtils } from '@/util'

@Entity()
export class ServerFolder {
  @ManyToOne({ entity: () => Server, primary: true })
  server: Server

  @OneToOne({ entity: () => Folder, primary: true })
  folder: Folder;

  [PrimaryKeyType]: [string, string]

  @Property({ columnType: 'text' })
  position: string = ReorderUtils.FIRST_POSITION
}
