FROM node:16.15.0

WORKDIR /usr/axd/backend

COPY package.json .

COPY tsconfig.json .

RUN yarn

COPY . .

EXPOSE 3030

CMD ["yarn", "start:dev"]