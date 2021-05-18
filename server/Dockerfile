FROM node:16
ENV NODE_ENV=production NODE_TLS_REJECT_UNAUTHORIZED=0
WORKDIR /app
COPY . .
RUN yarn
CMD ["yarn", "run", "start:server"]
