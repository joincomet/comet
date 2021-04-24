import { MikroORM } from '@mikro-orm/core'
import { mikroOrmConf } from '@/config/mikro-orm.config'
;(async () => {
  const orm = await MikroORM.init(mikroOrmConf)

  const migrator = orm.getMigrator()
  await migrator.createMigration() // creates file Migration20191019195930.ts
  await migrator.up() // runs migrations up to the latest
  await orm.close(true)
  process.exit(0)
})()
