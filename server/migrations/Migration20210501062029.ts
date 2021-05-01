import { Migration } from '@mikro-orm/migrations';

export class Migration20210501062029 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "name" text not null, "tag" text not null, "email" text not null, "last_login_at" timestamptz(0) null, "avatar_url" text null, "online_status" text check ("online_status" in (\'Online\', \'Away\', \'DoNotDisturb\', \'Offline\')) not null, "is_admin" bool not null, "color" text check ("color" in (\'Red\', \'Yellow\', \'Green\', \'Blue\', \'Indigo\', \'Purple\', \'Pink\')) not null, "password_hash" text not null, "is_deleted" bool not null, "is_banned" bool not null, "ban_reason" text null, "purchased_premium_at" timestamptz(0) null);');

    this.addSql('create table "relationship" ("owner_id" bigint not null, "user_id" bigint not null, "created_at" timestamptz(0) not null, "show_chat" bool not null, "status" text check ("status" in (\'None\', \'FriendRequestOutgoing\', \'FriendRequestIncoming\', \'Friends\', \'Blocking\', \'Blocked\')) not null, "last_view_at" timestamptz(0) not null, "last_message_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "unread_count" int4 not null);');
    this.addSql('alter table "relationship" add constraint "relationship_pkey" primary key ("owner_id", "user_id");');

    this.addSql('create table "group" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "owner_id" bigint not null, "name" text not null, "avatar_url" text null, "last_message_at" timestamptz(0) not null);');

    this.addSql('create table "group_user" ("user_id" bigint not null, "group_id" bigint not null, "last_view_at" timestamptz(0) not null, "unread_count" int4 not null);');
    this.addSql('alter table "group_user" add constraint "group_user_pkey" primary key ("user_id", "group_id");');

    this.addSql('create table "group_users" ("group_id" bigint not null, "user_id" bigint not null);');
    this.addSql('alter table "group_users" add constraint "group_users_pkey" primary key ("group_id", "user_id");');

    this.addSql('create table "server" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "name" text not null, "description" text null, "owner_id" bigint not null, "category" text check ("category" in (\'Arts\', \'Business\', \'Culture\', \'Discussion\', \'Entertainment\', \'Gaming\', \'Health\', \'Hobbies\', \'Lifestyle\', \'Memes\', \'Meta\', \'News\', \'Politics\', \'Programming\', \'Science\', \'Sports\', \'Technology\', \'Other\')) not null, "user_count" int4 not null, "avatar_url" text null, "banner_url" text null, "is_banned" bool not null, "is_deleted" bool not null, "send_welcome_message" bool not null, "system_messages_channel_id" bigint null, "is_public" bool not null, "is_featured" bool not null, "featured_position" text null);');
    this.addSql('alter table "server" add constraint "server_system_messages_channel_id_unique" unique ("system_messages_channel_id");');

    this.addSql('create table "channel" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "name" text null, "description" text null, "server_id" bigint not null, "position" text not null, "is_private" bool not null, "is_deleted" bool not null, "last_message_at" timestamptz(0) not null);');

    this.addSql('create table "channel_user" ("user_id" bigint not null, "channel_id" bigint not null, "last_view_at" timestamptz(0) not null, "mention_count" int4 not null);');
    this.addSql('alter table "channel_user" add constraint "channel_user_pkey" primary key ("user_id", "channel_id");');

    this.addSql('create table "folder" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "name" text not null, "description" text null, "avatar_url" text null, "owner_id" bigint null, "server_id" bigint null, "is_deleted" bool not null, "post_count" int4 not null, "follower_count" int4 not null, "is_collaborative" bool not null, "visibility" text check ("visibility" in (\'Public\', \'Friends\', \'Private\', \'Unlisted\')) not null);');

    this.addSql('create table "user_folder" ("user_id" bigint not null, "folder_id" bigint not null, "position" text not null);');
    this.addSql('alter table "user_folder" add constraint "user_folder_pkey" primary key ("user_id", "folder_id");');

    this.addSql('create table "server_folder" ("server_id" bigint not null, "folder_id" bigint not null, "position" text not null);');
    this.addSql('alter table "server_folder" add constraint "server_folder_folder_id_unique" unique ("folder_id");');
    this.addSql('alter table "server_folder" add constraint "server_folder_pkey" primary key ("server_id", "folder_id");');

    this.addSql('create table "role" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "name" text not null, "server_id" bigint not null, "position" text not null, "color" varchar(255) null, "permissions" text[] not null);');

    this.addSql('create table "channel_permissions" ("channel_id" bigint not null, "role_id" bigint not null, "allowed_permissions" text[] not null, "denied_permissions" text[] not null);');
    this.addSql('alter table "channel_permissions" add constraint "channel_permissions_pkey" primary key ("channel_id", "role_id");');

    this.addSql('create table "server_invite" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "duration" int2 not null, "max_uses" int4 null, "uses" int4 not null, "is_revoked" bool not null, "server_id" bigint not null, "creator_id" bigint not null);');
    this.addSql('alter table "server_invite" add constraint "server_invite_pkey" primary key ("id");');

    this.addSql('create table "server_user" ("user_id" bigint not null, "server_id" bigint not null, "position" text not null, "created_at" timestamptz(0) not null, "notification_setting" text check ("notification_setting" in (\'All\', \'Mentions\', \'None\')) not null, "status" text check ("status" in (\'None\', \'Joined\', \'Banned\')) not null, "nickname" varchar(255) null);');
    this.addSql('alter table "server_user" add constraint "server_user_pkey" primary key ("user_id", "server_id");');

    this.addSql('create table "message" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "author_id" bigint not null, "server_user_user_id" bigint null, "server_user_server_id" bigint null, "channel_id" bigint null, "group_id" bigint null, "to_user_id" bigint null, "text" text null, "image" jsonb null, "file" jsonb null, "link_metadatas" jsonb not null, "is_everyone_mentioned" bool not null, "is_pinned" bool not null, "updated_at" timestamptz(0) null, "pinned_at" timestamptz(0) null, "is_deleted" bool not null, "type" text check ("type" in (\'Normal\', \'Join\', \'Left\')) not null);');

    this.addSql('create table "message_invites" ("message_id" bigint not null, "server_invite_id" varchar(255) not null);');
    this.addSql('alter table "message_invites" add constraint "message_invites_pkey" primary key ("message_id", "server_invite_id");');

    this.addSql('create table "message_mentioned_users" ("message_id" bigint not null, "user_id" bigint not null);');
    this.addSql('alter table "message_mentioned_users" add constraint "message_mentioned_users_pkey" primary key ("message_id", "user_id");');

    this.addSql('create table "post" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "title" text not null, "text" text null, "link_url" text null, "link_metadata" jsonb null, "link_metadatas" jsonb not null, "images" jsonb not null, "author_user_id" bigint not null, "author_server_id" bigint not null, "is_pinned" bool not null, "pinned_at" timestamptz(0) null, "server_id" bigint not null, "vote_count" int4 not null, "comment_count" int4 not null, "updated_at" timestamptz(0) null, "is_deleted" bool not null);');

    this.addSql('create table "comment" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "author_user_id" bigint not null, "author_server_id" bigint not null, "post_id" bigint not null, "text" text not null, "parent_comment_id" bigint null, "vote_count" int4 not null, "is_pinned" bool not null, "pinned_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "is_deleted" bool not null, "link_metadatas" jsonb not null);');

    this.addSql('create table "comment_vote" ("user_id" bigint not null, "comment_id" bigint not null, "created_at" timestamptz(0) not null);');
    this.addSql('alter table "comment_vote" add constraint "comment_vote_pkey" primary key ("user_id", "comment_id");');

    this.addSql('create table "reply" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "user_id" bigint not null, "comment_id" bigint not null, "is_read" bool not null);');

    this.addSql('create table "folder_post" ("post_id" bigint not null, "folder_id" bigint not null, "added_by_user_id" bigint not null, "added_at" timestamptz(0) not null);');
    this.addSql('alter table "folder_post" add constraint "folder_post_pkey" primary key ("post_id", "folder_id", "added_by_user_id");');

    this.addSql('create table "post_vote" ("user_id" bigint not null, "post_id" bigint not null, "created_at" timestamptz(0) not null);');
    this.addSql('alter table "post_vote" add constraint "post_vote_pkey" primary key ("user_id", "post_id");');

    this.addSql('create table "server_user_roles" ("server_user_user_id" bigint not null, "server_user_server_id" bigint not null, "role_id" bigint not null);');
    this.addSql('alter table "server_user_roles" add constraint "server_user_roles_pkey" primary key ("server_user_user_id", "server_user_server_id", "role_id");');

    this.addSql('alter table "relationship" add constraint "relationship_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "relationship" add constraint "relationship_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "group" add constraint "group_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "group_user" add constraint "group_user_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "group_user" add constraint "group_user_group_id_foreign" foreign key ("group_id") references "group" ("id") on update cascade;');

    this.addSql('alter table "group_users" add constraint "group_users_group_id_foreign" foreign key ("group_id") references "group" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "group_users" add constraint "group_users_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "server" add constraint "server_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "server" add constraint "server_system_messages_channel_id_foreign" foreign key ("system_messages_channel_id") references "channel" ("id") on update cascade on delete set null;');

    this.addSql('alter table "channel" add constraint "channel_server_id_foreign" foreign key ("server_id") references "server" ("id") on update cascade;');

    this.addSql('alter table "channel_user" add constraint "channel_user_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "channel_user" add constraint "channel_user_channel_id_foreign" foreign key ("channel_id") references "channel" ("id") on update cascade;');

    this.addSql('alter table "folder" add constraint "folder_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade on delete set null;');
    this.addSql('alter table "folder" add constraint "folder_server_id_foreign" foreign key ("server_id") references "server" ("id") on update cascade on delete set null;');

    this.addSql('alter table "user_folder" add constraint "user_folder_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "user_folder" add constraint "user_folder_folder_id_foreign" foreign key ("folder_id") references "folder" ("id") on update cascade;');

    this.addSql('alter table "server_folder" add constraint "server_folder_server_id_foreign" foreign key ("server_id") references "server" ("id") on update cascade;');
    this.addSql('alter table "server_folder" add constraint "server_folder_folder_id_foreign" foreign key ("folder_id") references "folder" ("id") on update cascade;');

    this.addSql('alter table "role" add constraint "role_server_id_foreign" foreign key ("server_id") references "server" ("id") on update cascade;');

    this.addSql('alter table "channel_permissions" add constraint "channel_permissions_channel_id_foreign" foreign key ("channel_id") references "channel" ("id") on update cascade;');
    this.addSql('alter table "channel_permissions" add constraint "channel_permissions_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade;');

    this.addSql('alter table "server_invite" add constraint "server_invite_server_id_foreign" foreign key ("server_id") references "server" ("id") on update cascade;');
    this.addSql('alter table "server_invite" add constraint "server_invite_creator_id_foreign" foreign key ("creator_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "server_user" add constraint "server_user_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "server_user" add constraint "server_user_server_id_foreign" foreign key ("server_id") references "server" ("id") on update cascade;');

    this.addSql('alter table "message" add constraint "message_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "message" add constraint "message_server_user_user_id_server_user_server_id_foreign" foreign key ("server_user_user_id", "server_user_server_id") references "server_user" ("user_id", "server_id") on update cascade on delete set null;');
    this.addSql('alter table "message" add constraint "message_channel_id_foreign" foreign key ("channel_id") references "channel" ("id") on update cascade on delete set null;');
    this.addSql('alter table "message" add constraint "message_group_id_foreign" foreign key ("group_id") references "group" ("id") on update cascade on delete set null;');
    this.addSql('alter table "message" add constraint "message_to_user_id_foreign" foreign key ("to_user_id") references "user" ("id") on update cascade on delete set null;');

    this.addSql('alter table "message_invites" add constraint "message_invites_message_id_foreign" foreign key ("message_id") references "message" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "message_invites" add constraint "message_invites_server_invite_id_foreign" foreign key ("server_invite_id") references "server_invite" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "message_mentioned_users" add constraint "message_mentioned_users_message_id_foreign" foreign key ("message_id") references "message" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "message_mentioned_users" add constraint "message_mentioned_users_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "post" add constraint "post_author_user_id_author_server_id_foreign" foreign key ("author_user_id", "author_server_id") references "server_user" ("user_id", "server_id") on update cascade;');
    this.addSql('alter table "post" add constraint "post_server_id_foreign" foreign key ("server_id") references "server" ("id") on update cascade;');

    this.addSql('alter table "comment" add constraint "comment_author_user_id_author_server_id_foreign" foreign key ("author_user_id", "author_server_id") references "server_user" ("user_id", "server_id") on update cascade;');
    this.addSql('alter table "comment" add constraint "comment_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade;');
    this.addSql('alter table "comment" add constraint "comment_parent_comment_id_foreign" foreign key ("parent_comment_id") references "comment" ("id") on update cascade on delete set null;');

    this.addSql('alter table "comment_vote" add constraint "comment_vote_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "comment_vote" add constraint "comment_vote_comment_id_foreign" foreign key ("comment_id") references "comment" ("id") on update cascade;');

    this.addSql('alter table "reply" add constraint "reply_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "reply" add constraint "reply_comment_id_foreign" foreign key ("comment_id") references "comment" ("id") on update cascade;');

    this.addSql('alter table "folder_post" add constraint "folder_post_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade;');
    this.addSql('alter table "folder_post" add constraint "folder_post_folder_id_foreign" foreign key ("folder_id") references "folder" ("id") on update cascade;');
    this.addSql('alter table "folder_post" add constraint "folder_post_added_by_user_id_foreign" foreign key ("added_by_user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "post_vote" add constraint "post_vote_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "post_vote" add constraint "post_vote_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade;');

    this.addSql('alter table "server_user_roles" add constraint "server_user_roles_server_user_user_id_server_user_server_id_foreign" foreign key ("server_user_user_id", "server_user_server_id") references "server_user" ("user_id", "server_id") on update cascade on delete cascade;');
    this.addSql('alter table "server_user_roles" add constraint "server_user_roles_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade on delete cascade;');

    this.addSql('create index "message_server_user_user_id_server_user_server_id_index" on "message" ("server_user_user_id", "server_user_server_id");');

    this.addSql('create index "post_author_user_id_author_server_id_index" on "post" ("author_user_id", "author_server_id");');

    this.addSql('create index "comment_author_user_id_author_server_id_index" on "comment" ("author_user_id", "author_server_id");');

    this.addSql('create index "server_user_roles_server_user_user_id_server_user_server_id_index" on "server_user_roles" ("server_user_user_id", "server_user_server_id");');
  }

}
