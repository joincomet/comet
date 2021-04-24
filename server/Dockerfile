FROM node:latest
WORKDIR /app
COPY . .
RUN yarn && yarn run build
CMD ["yarn", "run", "start"]
