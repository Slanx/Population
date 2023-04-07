FROM node:18-alpine AS development
RUN apk add --no-cache libc6-compat
WORKDIR /usr/app/client

COPY package*.json ./
RUN npm ci

COPY . .

CMD [ "npm", "run", "dev" ]

FROM node:18-alpine As build
WORKDIR /usr/app/client

COPY package*.json ./

COPY --from=development /usr/app/client/node_modules ./node_modules

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS production
WORKDIR /usr/app/client

ENV NODE_ENV production

ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build /usr/app/client/node_modules ./node_modules
COPY --from=build /usr/app/client/public ./public
COPY --from=build --chown=nextjs:nodejs /usr/app/client/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /usr/app/client/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD [ "npm", "run", "start" ]
