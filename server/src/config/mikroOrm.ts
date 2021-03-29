import { Options, ReflectMetadataProvider } from '@mikro-orm/core'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'
import * as entities from '@/entity'

export const mikroOrmConf = {
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
  },
  driverOptions:
    process.env.NODE_ENV === 'production'
      ? {
          connection: { ssl: { rejectUnauthorized: false } }
        }
      : {},
  migrations: {
    disableForeignKeys: false
  }
} as Options<PostgreSqlDriver>
