FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apk update && apk upgrade

COPY . /usr/src/app/

RUN yarn
RUN yarn run build

EXPOSE 3000

ENV HOST=0.0.0.0
ENV NODE_ENV=production

CMD "yarn" "run" "start"
