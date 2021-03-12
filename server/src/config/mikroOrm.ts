import { Options, ReflectMetadataProvider } from '@mikro-orm/core'
import * as entities from '@/entity'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'

export default {
  metadataProvider: ReflectMetadataProvider,
  cache: { enabled: false },
  entities: Object.values(entities),
  type: 'postgresql',
  clientUrl:
    process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432',
  dbName: process.env.DATABASE_NAME || 'postgres',
  debug: process.env.NODE_ENV !== 'production',
  forceUtcTimezone: true,
  findOneOrFailHandler: (entityName: string) => {
    return new Error(`${entityName} not found!`)
  }
} as Options<PostgreSqlDriver>
