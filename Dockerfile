FROM node:18-alpine3.17
RUN mkdir /app && cd /app
WORKDIR /app
RUN mkdir iexec_out
RUN npm install ethers
RUN npm install fs
COPY ./src /app
ENTRYPOINT [ "node", "/app/app.js"]