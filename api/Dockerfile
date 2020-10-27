FROM node:14-alpine

RUN apk update && apk upgrade && apk add git make gcc g++ python2 && mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN yarn && yarn run build

EXPOSE 4000

ENV NODE_ENV=production \
    PGSSLMODE=require \
    TS_NODE_PROJECT=tsconfig.prod.json

CMD "yarn" "run" "start"
