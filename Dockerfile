FROM node:alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ARG VITE_MEDUSA_BACKEND_URL=${VITE_MEDUSA_BACKEND_URL} \
    VITE_MEDUSA_PUBLISHABLE_KEY=${VITE_MEDUSA_PUBLISHABLE_KEY}

RUN npm run build

FROM node:alpine

COPY --from=build /app/build ./

ENV NODE_ENV=production PORT=3000

EXPOSE 3000

CMD ["node", "index.js"]
