FROM node:12-alpine

EXPOSE 8061

RUN apk update && apk add git

RUN git clone https://github.com/itteco/iframely.git

COPY ./iframely /iframely

WORKDIR /iframely

COPY ./iframely.config.js .

RUN npm install -g forever && \
    npm install

ENTRYPOINT [ "/iframely/docker/entrypoint.sh" ]
