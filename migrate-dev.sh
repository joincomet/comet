#!/bin/bash

PGPASSWORD=password dropdb -U postgres -h localhost -p 5432 postgres
PGPASSWORD=password createdb -U postgres -h localhost -p 5432 postgres
PGPASSWORD=password pg_restore --verbose --clean --no-acl --no-owner -U postgres -h localhost -p 5432 -d postgres ./latest.dump
PGPASSWORD=password psql -U postgres -h localhost -p 5432 -d postgres -f ./api/src/migrations/from-getcomet/migration.sql
function generate_env
{
    INLINE_ENV=$(echo $(grep -v -E '^(#.*|[[:space:]]*|.*=\s*)$' "./.env" | while read line; do echo "-e $line"; done))
    echo "$INLINE_ENV"
}
docker exec ${generate_env} api npm run migrate
