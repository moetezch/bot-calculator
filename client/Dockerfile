FROM node:18

WORKDIR /usr/src/app/client

COPY package.json yarn.lock ./

RUN yarn install

CMD ["yarn", "start"]
