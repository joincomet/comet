#!/bin/bash

PGPASSWORD=password pg_dump --verbose --clean --no-acl --no-owner -U postgres -h localhost -p 5432 postgres | psql -d $DATABASE_URL
