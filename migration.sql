DROP TABLE galaxy_planets_planet;
DROP TABLE galaxy;

DROP TABLE planet_banned_users_user;
DROP TABLE post_view;
DROP TABLE reply_notification;
DROP TABLE user_blocked_planets_planet;
DROP TABLE user_blocked_by_user;
DROP TABLE user_followers_user;
DROP TABLE user_hidden_posts_post;
DROP TABLE user_muted_planets_planet;
DROP TABLE user_saved_comments_comment;
DROP TABLE user_saved_posts_post;

-- BEGIN USER MIGRATION --

ALTER TABLE "user" RENAME COLUMN "profilePicUrl" TO "avatarImageUrl";
ALTER TABLE "user" ADD COLUMN "_id" SERIAL;

ALTER TABLE "post_endorsement" DROP CONSTRAINT "PK_04d0c35738df2c5eebdf6e16efc";
ALTER TABLE "post_endorsement" DROP CONSTRAINT "FK_bef3e152348c13606d92ec61544";
UPDATE "post_endorsement" T SET "userId" = (SELECT "_id" FROM "user" WHERE id = T."userId");
ALTER TABLE "post_endorsement" ADD CONSTRAINT "FK_bef3e152348c13606d92ec61544" FOREIGN KEY ("userId") REFERENCES "user" (_id) ON DELETE CASCADE;
ALTER TABLE "post_endorsement" ADD CONSTRAINT "PK_04d0c35738df2c5eebdf6e16efc" PRIMARY KEY ("userId", "postId");

ALTER TABLE "post" DROP CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0";
UPDATE "post" T SET "authorId" = (SELECT "_id" FROM "user" WHERE id = T."authorId");
ALTER TABLE "post" ADD CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0" FOREIGN KEY ("authorId") REFERENCES "user" (_id) ON DELETE CASCADE;

ALTER TABLE "comment_endorsement" DROP CONSTRAINT "PK_9698f1b56e7addb07951aeb511d";
ALTER TABLE "comment_endorsement" DROP CONSTRAINT "FK_238e36e491d26e6ec6dbcecf3f7";
UPDATE "comment_endorsement" T SET "userId" = (SELECT "_id" FROM "user" WHERE id = T."userId");
ALTER TABLE "comment_endorsement" ADD CONSTRAINT "FK_238e36e491d26e6ec6dbcecf3f7" FOREIGN KEY ("userId") REFERENCES "user" (_id) ON DELETE CASCADE;
ALTER TABLE "comment_endorsement" ADD CONSTRAINT "PK_9698f1b56e7addb07951aeb511d" PRIMARY KEY ("userId", "commentId");

ALTER TABLE "comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd";
UPDATE "comment" T SET "authorId" = (SELECT "_id" FROM "user" WHERE id = T."authorId");
ALTER TABLE "comment" ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user" (_id) ON DELETE CASCADE;

ALTER TABLE "planet_moderators_user" DROP CONSTRAINT "PK_6eff57b593f387409defc011abe";
ALTER TABLE "planet_moderators_user" DROP CONSTRAINT "FK_818d9e5e8d202dec54d4b493e67";
UPDATE "planet_moderators_user" T SET "userId" = (SELECT "_id" FROM "user" WHERE id = T."userId");
ALTER TABLE "planet_moderators_user" ADD CONSTRAINT "FK_818d9e5e8d202dec54d4b493e67" FOREIGN KEY ("userId") REFERENCES "user" (_id) ON DELETE CASCADE;
ALTER TABLE "planet_moderators_user" ADD CONSTRAINT "PK_6eff57b593f387409defc011abe" PRIMARY KEY ("planetName", "userId");

ALTER TABLE "planet_users_user" DROP CONSTRAINT "PK_a59e8590eebc4943397b1747b59";
ALTER TABLE "planet_users_user" DROP CONSTRAINT "FK_43f4337a15dc12b92f03df0e783";
UPDATE "planet_users_user" T SET "userId" = (SELECT "_id" FROM "user" WHERE id = T."userId");
ALTER TABLE "planet_users_user" ADD CONSTRAINT "FK_43f4337a15dc12b92f03df0e783" FOREIGN KEY ("userId") REFERENCES "user" (_id) ON DELETE CASCADE;
ALTER TABLE "planet_users_user" ADD CONSTRAINT "PK_a59e8590eebc4943397b1747b59" PRIMARY KEY ("planetName", "userId");

ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760";
ALTER TABLE "user" DROP COLUMN "id";
ALTER TABLE "user" RENAME COLUMN _id to id;
ALTER TABLE "user" ADD PRIMARY KEY (id);

-- END USER MIGRATION --

-- BEGIN POSTS MIGRATION --

ALTER TABLE "post" ADD COLUMN "_id" SERIAL;

ALTER TABLE "post_endorsement" DROP CONSTRAINT "PK_04d0c35738df2c5eebdf6e16efc";
ALTER TABLE "post_endorsement" DROP CONSTRAINT "FK_bef3e152348c13606d92ec61544";
UPDATE "post_endorsement" T SET "postId" = (SELECT "_id" FROM "post" WHERE id = T."postId");
ALTER TABLE "post_endorsement" ADD CONSTRAINT "FK_bef3e152348c13606d92ec61544" FOREIGN KEY ("userId") REFERENCES "user" (_id) ON DELETE CASCADE;
ALTER TABLE "post_endorsement" ADD CONSTRAINT "PK_04d0c35738df2c5eebdf6e16efc" PRIMARY KEY ("userId", "postId");

ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060";
UPDATE "comment" T SET "postId" = (SELECT "_id" FROM "user" WHERE id = T."postId");
ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "user" (_id) ON DELETE CASCADE;

ALTER TABLE "post" DROP CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee";
ALTER TABLE "post" DROP COLUMN "id";
ALTER TABLE "post" RENAME COLUMN _id to id;
ALTER TABLE "post" ADD PRIMARY KEY (id);

-- END POSTS MIGRATION --

-- BEGIN COMMENTS MIGRATION --

ALTER TABLE "comment" ADD COLUMN "_id" SERIAL;

ALTER TABLE "comment_endorsement" DROP CONSTRAINT "PK_9698f1b56e7addb07951aeb511d";
ALTER TABLE "comment_endorsement" DROP CONSTRAINT "FK_13b6eb3e5eb9b7a0a6f24c7d613";
UPDATE "comment_endorsement" T SET "commentId" = (SELECT "_id" FROM "post" WHERE id = T."commentId");
ALTER TABLE "comment_endorsement" ADD CONSTRAINT "FK_13b6eb3e5eb9b7a0a6f24c7d613" FOREIGN KEY ("userId") REFERENCES "user" (_id) ON DELETE CASCADE;
ALTER TABLE "comment_endorsement" ADD CONSTRAINT "PK_9698f1b56e7addb07951aeb511d" PRIMARY KEY ("userId", "commentId");

ALTER TABLE "comment" DROP CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2";
ALTER TABLE "comment" DROP CONSTRAINT "FK_73aac6035a70c5f0313c939f237";
ALTER TABLE "comment" DROP COLUMN "id";
ALTER TABLE "comment" RENAME COLUMN _id to id;
ALTER TABLE "comment" ADD PRIMARY KEY (id);

-- END COMMENTS MIGRATION --
