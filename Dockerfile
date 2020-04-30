# Base build. Shared for all targets
FROM node:latest AS base

RUN mkdir -p /app 
WORKDIR /app

COPY . ./

# Custom commands for development stage.
FROM base AS build-development

RUN npm install

CMD npm start

# Custom commands for production stage.
FROM base AS build-production

RUN npm install --only=production && npm install -g serve && npm run-script build

CMD serve build
