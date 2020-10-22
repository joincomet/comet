FROM node:alpine

RUN apk update && apk upgrade && mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN yarn && yarn run build

EXPOSE 3000

ENV HOST=0.0.0.0 \
    NODE_ENV=production \
    PORT=3000 \
    NEXT_TELEMETRY_DISABLED=1 \

CMD "yarn" "run" "start"
