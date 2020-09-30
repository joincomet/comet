ALTER TABLE "planet"
    ADD COLUMN "settings" jsonb;
UPDATE planet T
SET settings = (SELECT to_json(concat(
        '{',
        '"avatarImageUrl": "', T."avatarImageUrl", '", ',
        '"bannerImageUrl": "', T."bannerImageUrl", '", ',
        '"themeColor": "', T."themeColor", '", ',
        '"customName": "', T."customName", '", ',
        '"description": "', T."description", '"',
        '}'))::jsonb AS settings
                FROM planet
                WHERE "name" = T."name")
WHERE 1 = 1;

ALTER TABLE "user"
    ADD COLUMN "settings" jsonb;
UPDATE "user" T
SET settings = (SELECT to_json(concat(
        '{',
        '"appearOffline": ', (SELECT (CASE WHEN T."appearOffline" = TRUE THEN 'true' ELSE 'false' END)
                FROM "user"
                WHERE "id" = T."id"),
        '}'))::jsonb AS settings
                FROM "user"
                WHERE "id" = T."id")
WHERE 1 = 1;

ALTER TABLE "user"
    ADD COLUMN "profile" jsonb;
UPDATE "user" T
SET profile = (SELECT to_json(concat(
        '{',
        '"avatarImageUrl": "', T."profilePicUrl", '", ',
        '"bannerImageUrl": "', T."bannerImageUrl", '", ',
        '"bio": "', T."bio", '", ',
        '"tag": "', T."tag", '", ',
        '"tagColor": "', T."tagColor", '", ',
        '"fullName": "', T."username", '"',
        '}'))::jsonb AS profile
               FROM "user"
               WHERE "id" = T."id")
WHERE 1 = 1;



CREATE OR REPLACE FUNCTION drop_unneeded_tables() RETURNS void AS
$$
BEGIN
    ALTER TABLE planet
        DROP CONSTRAINT "FK_365bc311fee310284e3896041dc";
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
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION drop_unneeded_columns() RETURNS void AS
$$
BEGIN
    ALTER TABLE "user"
        DROP COLUMN "bio";
    ALTER TABLE "user"
        DROP COLUMN "profilePicUrl";
    ALTER TABLE "user"
        DROP COLUMN "bannerImageUrl";
    ALTER TABLE "user"
        DROP COLUMN "ipAddresses";
    ALTER TABLE "user"
        DROP COLUMN "lastPostedAt";
    ALTER TABLE "user"
        DROP COLUMN "lastUploadedImageAt";
    ALTER TABLE "user"
        DROP COLUMN "lastCommentedAt";
    ALTER TABLE "user"
        DROP COLUMN "tag";
    ALTER TABLE "user"
        DROP COLUMN "tagColor";
    ALTER TABLE "user"
        DROP COLUMN "appearOffline";
    ALTER TABLE "user"
        DROP COLUMN "xp";

    ALTER TABLE "comment"
        DROP COLUMN "rootCommentId";

    ALTER TABLE "post"
        DROP COLUMN "domain";

    ALTER TABLE "planet"
        DROP COLUMN "allowTextPosts";
    ALTER TABLE "planet"
        DROP COLUMN "allowLinkPosts";
    ALTER TABLE "planet"
        DROP COLUMN "allowImagePosts";
    ALTER TABLE "planet"
        DROP COLUMN "defaultSort";
    ALTER TABLE "planet"
        DROP COLUMN "defaultCommentSort";
    ALTER TABLE "planet"
        DROP COLUMN "avatarImageUrl";
    ALTER TABLE "planet"
        DROP COLUMN "themeColor";
    ALTER TABLE "planet"
        DROP COLUMN "galaxyName";
    ALTER TABLE "planet"
        DROP COLUMN "customName";
    ALTER TABLE "planet"
        DROP COLUMN "modPostsOnly";
    ALTER TABLE "planet"
        DROP COLUMN "bannerImageUrl";
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION rename_columns() RETURNS void AS
$$
BEGIN
    ALTER TABLE "comment"
        RENAME COLUMN "authorId" TO "author_id";
    ALTER TABLE "comment"
        RENAME COLUMN "postId" TO "post_id";
    ALTER TABLE "comment"
        RENAME COLUMN "textContent" TO "text_content";
    ALTER TABLE "comment"
        RENAME COLUMN "createdAt" TO "created_at";
    ALTER TABLE "comment"
        RENAME COLUMN "editedAt" TO "edited_at";
    ALTER TABLE "comment"
        RENAME COLUMN "parentCommentId" TO "parent_comment_id";
    ALTER TABLE "comment"
        RENAME COLUMN "endorsementCount" TO "upvote_count";
    ALTER TABLE "comment"
        RENAME COLUMN "removedReason" TO "removed_reason";

    ALTER TABLE "comment_endorsement"
        RENAME COLUMN "userId" TO "user_id";
    ALTER TABLE "comment_endorsement"
        RENAME COLUMN "commentId" TO "comment_id";
    ALTER TABLE "comment_endorsement"
        RENAME COLUMN "createdAt" TO "created_at";

    ALTER TABLE "planet"
        RENAME COLUMN "createdAt" TO "created_at";
    ALTER TABLE "planet"
        RENAME COLUMN "creatorId" TO "creator_id";
    ALTER TABLE "planet"
        ADD COLUMN "temp_name" text NOT NULL default '';
    UPDATE "planet" SET "temp_name" = "name";
    ALTER TABLE "planet"
        RENAME COLUMN "name" TO "id";

    ALTER TABLE "planet_moderators_user"
        RENAME COLUMN "planetName" TO "planet_id";
    ALTER TABLE "planet_moderators_user"
        RENAME COLUMN "userId" TO "user_id";

    ALTER TABLE "planet_users_user"
        RENAME COLUMN "planetName" TO "planet_id";
    ALTER TABLE "planet_users_user"
        RENAME COLUMN "userId" TO "user_id";

    ALTER TABLE "post"
        RENAME COLUMN "textContent" TO "text_content";
    ALTER TABLE "post"
        RENAME COLUMN "authorId" TO "author_id";
    ALTER TABLE "post"
        RENAME COLUMN "createdAt" TO "created_at";
    ALTER TABLE "post"
        RENAME COLUMN "editedAt" TO "edited_at";
    ALTER TABLE "post"
        RENAME COLUMN "commentCount" TO "comment_count";
    ALTER TABLE "post"
        RENAME COLUMN "postedToProfile" TO "posted_to_profile";
    ALTER TABLE "post"
        RENAME COLUMN "endorsementCount" TO "upvote_count";
    ALTER TABLE "post"
        RENAME COLUMN "thumbnailUrl" TO "thumbnail_url";
    ALTER TABLE "post"
        RENAME COLUMN "planetName" TO "planet_id";
    ALTER TABLE "post"
        RENAME COLUMN "removedReason" TO "removed_reason";

    ALTER TABLE "post_endorsement"
        RENAME COLUMN "userId" TO "user_id";
    ALTER TABLE "post_endorsement"
        RENAME COLUMN "postId" TO "post_id";
    ALTER TABLE "post_endorsement"
        RENAME COLUMN "createdAt" TO "created_at";

    ALTER TABLE "user"
        RENAME COLUMN "createdAt" TO "created_at";
    ALTER TABLE "user"
        RENAME COLUMN "lastLogin" TO "last_login";
    ALTER TABLE "user"
        RENAME COLUMN "passwordHash" TO "password_hash";
    ALTER TABLE "user"
        RENAME COLUMN "banReason" TO "ban_reason";
    ALTER TABLE "user"
        RENAME COLUMN "endorsementCount" TO "upvote_count";

END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION add_new_ids() RETURNS void AS
$$
BEGIN
    ALTER TABLE "user"
        ADD COLUMN "_id" SERIAL UNIQUE NOT NULL;
    ALTER TABLE "comment"
        ADD COLUMN "_id" SERIAL UNIQUE NOT NULL;
    ALTER TABLE "post"
        ADD COLUMN "_id" SERIAL UNIQUE NOT NULL;
    ALTER TABLE "planet"
        ADD COLUMN "_id" SERIAL UNIQUE NOT NULL;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION update_mm_relation(_relation_table text, _fromEntity text, _pk text, _fk text, _id text,
                                              _otherId text, _compareId text) RETURNS void AS
$$
BEGIN
    EXECUTE 'ALTER TABLE "' || _relation_table || '" DROP CONSTRAINT "' || _pk || '";';
    EXECUTE 'ALTER TABLE "' || _relation_table || '" DROP CONSTRAINT "' || _fk || '";';
    EXECUTE 'ALTER TABLE "' || _relation_table || '" ADD COLUMN "' || _id || '2" integer;';
    EXECUTE 'UPDATE "' || _relation_table || '" T SET "' || _id || '2" = (SELECT "_id" FROM "' || _fromEntity ||
            '" WHERE ' || _compareId || ' = T."' || _id || '") WHERE 1=1;';
    EXECUTE 'ALTER TABLE "' || _relation_table || '" DROP COLUMN "' || _id || '";';
    EXECUTE 'ALTER TABLE "' || _relation_table || '" ADD CONSTRAINT "' || _fk || '" FOREIGN KEY ("' || _id ||
            '2") REFERENCES "' ||
            _fromEntity || '" (_id) ON DELETE CASCADE;';
    EXECUTE 'ALTER TABLE "' || _relation_table || '" ADD CONSTRAINT "' || _pk || '" PRIMARY KEY ("' || _id || '2", "' ||
            _otherId || '");';
    EXECUTE 'ALTER TABLE "' || _relation_table || '" RENAME COLUMN "' || _id || '2" TO "' || _id || '";';
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION update_relation(_relation_table text, _fromEntity text, _fk text, _id text,
                                           _compareId text) RETURNS void AS
$$
BEGIN
    EXECUTE 'ALTER TABLE "' || _relation_table || '" DROP CONSTRAINT "' || _fk || '";';
    EXECUTE 'ALTER TABLE "' || _relation_table || '" ADD COLUMN "' || _id || '2" integer;';
    EXECUTE 'UPDATE "' || _relation_table || '" T SET "' || _id || '2" = (SELECT "_id" FROM "' || _fromEntity ||
            '" WHERE ' || _compareId || ' = T."' || _id || '") WHERE 1=1;';
    EXECUTE 'ALTER TABLE "' || _relation_table || '" DROP COLUMN "' || _id || '";';
    EXECUTE 'ALTER TABLE "' || _relation_table || '" ADD CONSTRAINT "' || _fk || '" FOREIGN KEY ("' || _id ||
            '2") REFERENCES "' ||
            _fromEntity || '" (_id) ON DELETE CASCADE;';
    EXECUTE 'ALTER TABLE "' || _relation_table || '" RENAME COLUMN "' || _id || '2" TO "' || _id || '";';
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION update_entity(_entity text, _pk text) RETURNS void AS
$$
BEGIN
    EXECUTE 'ALTER TABLE "' || _entity || '" DROP CONSTRAINT "' || _pk || '";';
    EXECUTE 'ALTER TABLE "' || _entity || '" DROP COLUMN "id";';
    EXECUTE 'ALTER TABLE "' || _entity || '" RENAME COLUMN "_id" to "id";';
    EXECUTE 'ALTER TABLE "' || _entity || '" ADD PRIMARY KEY ("id");';
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION renaming() RETURNS void AS
$$
BEGIN
    ALTER TABLE planet_moderators_user
        RENAME COLUMN "planet_id" TO "community_id";
    ALTER TABLE planet_users_user
        RENAME COLUMN "planet_id" TO "community_id";
    ALTER TABLE post
        RENAME COLUMN "planet_id" TO "community_id";
    ALTER TABLE planet
        RENAME COLUMN "temp_name" TO "name";

    ALTER TABLE planet
        RENAME TO community;
    ALTER TABLE planet_moderators_user
        RENAME TO community_moderators_user;
    ALTER TABLE planet_users_user
        RENAME TO community_users_user;
    ALTER TABLE post_endorsement
        RENAME TO post_upvote;
    ALTER TABLE comment_endorsement
        RENAME TO comment_upvote;
END;
$$ LANGUAGE plpgsql;



SELECT "drop_unneeded_tables"();
SELECT "drop_unneeded_columns"();
SELECT "rename_columns"();
SELECT "add_new_ids"();

-- Change user IDs

SELECT update_mm_relation('post_endorsement', 'user', 'PK_04d0c35738df2c5eebdf6e16efc',
                          'FK_bef3e152348c13606d92ec61544',
                          'user_id', 'post_id', 'id');
SELECT "update_relation"('post', 'user', 'FK_c6fb082a3114f35d0cc27c518e0', 'author_id', 'id');
SELECT update_mm_relation('comment_endorsement', 'user', 'PK_9698f1b56e7addb07951aeb511d',
                          'FK_238e36e491d26e6ec6dbcecf3f7',
                          'user_id', 'comment_id', 'id');
SELECT "update_relation"('comment', 'user', 'FK_276779da446413a0d79598d4fbd', 'author_id', 'id');
SELECT update_mm_relation('planet_moderators_user', 'user', 'PK_6eff57b593f387409defc011abe',
                          'FK_818d9e5e8d202dec54d4b493e67',
                          'user_id', 'planet_id', 'id');
SELECT update_mm_relation('planet_users_user', 'user', 'PK_a59e8590eebc4943397b1747b59',
                          'FK_43f4337a15dc12b92f03df0e783',
                          'user_id', 'planet_id', 'id');
SELECT "update_relation"('planet', 'user', 'FK_25e33be82bd4d3b5eef5a2fc063', 'creator_id', 'id');

-- Change post IDs

SELECT update_mm_relation('post_endorsement', 'post', 'PK_04d0c35738df2c5eebdf6e16efc',
                          'FK_bef3e152348c13606d92ec61544',
                          'post_id', 'user_id', 'id');
SELECT "update_relation"('post', 'user', 'FK_c6fb082a3114f35d0cc27c518e0', 'author_id', '_id');
SELECT "update_relation"('comment', 'post', 'FK_94a85bb16d24033a2afdd5df060', 'post_id', 'id');

-- Change comment IDs

SELECT update_mm_relation('comment_endorsement', 'comment', 'PK_9698f1b56e7addb07951aeb511d',
                          'FK_13b6eb3e5eb9b7a0a6f24c7d613',
                          'comment_id', 'user_id', 'id');
SELECT "update_relation"('comment', 'user', 'FK_276779da446413a0d79598d4fbd', 'author_id', '_id');
SELECT "update_relation"('comment', 'post', 'FK_94a85bb16d24033a2afdd5df060', 'post_id', '_id');
SELECT "update_relation"('comment', 'comment', 'FK_73aac6035a70c5f0313c939f237', 'parent_comment_id', 'id');

-- Change planet IDs

SELECT "update_relation"('planet_moderators_user', 'planet', 'FK_c6f5425ce17e655082497bb224d', 'planet_id', 'id');
SELECT "update_relation"('planet_users_user', 'planet', 'FK_70b6f81d3315e7f90ebbebebcb7', 'planet_id', 'id');
SELECT "update_relation"('post', 'planet', 'FK_c0e17c4026c33f3024968b42294', 'planet_id', 'id');

-- Update entities (_id -> id)

SELECT "update_entity"('user', 'PK_cace4a159ff9f2512dd42373760');
SELECT "update_entity"('comment', 'PK_0b0e4bbc8415ec426f87f3a88e2');
SELECT "update_entity"('planet', 'PK_0c6595b668a276b8482611a20e0');
SELECT "update_entity"('post', 'PK_be5fda3aac270b134ff9c21cdee');

-- Rename tables

SELECT renaming();
