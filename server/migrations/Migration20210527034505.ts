import { Migration } from '@mikro-orm/migrations';

export class Migration20210527034505 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "server" drop constraint "server_system_messages_channel_id_foreign";');
    this.addSql('alter table "server" drop constraint "server_system_messages_channel_id_unique";');
    this.addSql('alter table "server" drop column "system_messages_channel_id";');

    this.addSql('alter table "channel" add column "is_default" bool not null default false;');
  }

}
