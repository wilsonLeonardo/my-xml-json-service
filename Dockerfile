# base
FROM node:18 AS base

WORKDIR /usr/src/app

COPY package*.json ./
    
RUN npm install

COPY . .

# for build

FROM base AS builder

WORKDIR /usr/src/app

RUN npm run build

# for production

FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /usr/src/app/dist/ ./

EXPOSE 3000

CMD ["node", "main.js"]