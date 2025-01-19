FROM node:alpine AS base
WORKDIR /app

FROM base AS build
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

ARG VITE_MEDUSA_BACKEND_URL=${VITE_MEDUSA_BACKEND_URL}
ARG VITE_MEDUSA_PUBLISHABLE_KEY=${VITE_MEDUSA_PUBLISHABLE_KEY}

RUN npm run build

FROM base AS runtime
COPY --from=build /app/build ./build

ENV NODE_ENV=production PORT=3000

EXPOSE 3000

CMD ["node", "./build/index.js"]