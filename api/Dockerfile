FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apk update && apk upgrade && apk add git && apk add make && apk add gcc && apk add g++ && apk add python2

COPY . /usr/src/app/

RUN yarn global add node-gyp && yarn
RUN yarn run build

EXPOSE 4000

ENV NODE_ENV=production
ENV PGSSLMODE=require
ENV TS_NODE_PROJECT=tsconfig.prod.json

CMD "yarn" "run" "start"
