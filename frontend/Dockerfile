FROM node:14-alpine

RUN apk update && apk upgrade && mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN yarn && yarn run build

ENV HOST=0.0.0.0 \
    NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

CMD "yarn" "run" "start"
