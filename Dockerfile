FROM node:18-alpine

WORKDIR /srv/app

COPY package.json yarn.lock ./

RUN yarn install --force --network-timeout 1000000

COPY . .

ENV NODE_ENV=production

RUN yarn build

EXPOSE 1337

CMD ["yarn", "start"]
