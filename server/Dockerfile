FROM node:18-alpine As development

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm ci

COPY . .

FROM node:18-alpine As build

WORKDIR /usr/src/server

COPY package*.json ./

COPY --from=development /usr/src/server/node_modules ./node_modules

COPY . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine As production

COPY --from=build /usr/src/server/node_modules ./node_modules
COPY --from=build /usr/src/server/dist ./dist

CMD [ "node", "dist/main.js" ]