FROM node:latest

RUN mkdir -p /usr/src/app
ENV NODE_ENV=development PORT=3000
EXPOSE 3000

WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/
RUN yarn set version berry
RUN yarn plugin import interactive-tools
COPY .yarnrc.yml /usr/src/app/
RUN yarn install

COPY . /usr/src/app

RUN npx next telemetry disable

CMD [ "yarn", "run", "dev" ]
