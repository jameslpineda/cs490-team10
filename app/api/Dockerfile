FROM node:18-slim

WORKDIR /app

COPY ./package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 443

CMD ["yarn", "dev"]