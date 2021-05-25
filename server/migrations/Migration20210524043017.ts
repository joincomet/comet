import { Migration } from '@mikro-orm/migrations';

export class Migration20210524043017 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "role" drop constraint if exists "role_is_default_check";');
    this.addSql('alter table "role" alter column "is_default" type bool using ("is_default"::bool);');
    this.addSql('alter table "role" alter column "is_default" drop default;');
    this.addSql('alter table "role" drop column "position";');
  }

}
