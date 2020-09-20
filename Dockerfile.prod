FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/
RUN yarn

COPY . /usr/src/app

RUN yarn run build

CMD "yarn" "run" "start"
