FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/
RUN yarn

COPY . /usr/src/app

RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*
COPY ./dbcert.crt /usr/local/share/ca-certificates/dbcert.crt
RUN update-ca-certificates

RUN yarn run build

CMD "yarn" "run" "start"
