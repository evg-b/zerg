FROM node:16-alpine as zerg

WORKDIR /usr/src/app
COPY server/ ./server/

EXPOSE 4444

RUN yarn

CMD ["ts-node", "./server/server.ts"]