FROM node:18-alpine3.17

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN mkdir /app && cd /app
# Install required node dependencies
RUN npm ci
COPY ./src /app
ENTRYPOINT [ "node", "/app/app.js"]