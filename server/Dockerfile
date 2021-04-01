FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN yarn
CMD ["yarn", "run", "start"]
