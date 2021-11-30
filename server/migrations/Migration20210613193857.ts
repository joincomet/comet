import { Migration } from '@mikro-orm/migrations';

export class Migration20210613193857 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "is_staff" bool not null default false;');
  }

}
