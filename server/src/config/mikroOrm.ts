import { Options, ReflectMetadataProvider } from '@mikro-orm/core'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'
import * as entities from '@/entity'

export default {
  highlighter: new SqlHighlighter(),
  metadataProvider: ReflectMetadataProvider,
  cache: { enabled: false },
  entities: Object.values(entities),
  type: 'postgresql',
  clientUrl:
    process.env.DATABASE_URL ??
    'postgresql://postgres:password@localhost:5432/postgres',
  debug: process.env.NODE_ENV !== 'production',
  forceUtcTimezone: true,
  findOneOrFailHandler: (entityName: string) => {
    return new Error(`${entityName} not found!`)
  }
} as Options<PostgreSqlDriver>
