import { Migration } from '@mikro-orm/migrations';

export class Migration20210526065425 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "is_og" bool not null default false;');

    this.addSql('alter table "server" drop column "featured_position";');
  }

}
