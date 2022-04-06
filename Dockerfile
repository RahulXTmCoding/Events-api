FROM node:12.18.1

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .
EXPOSE 4000
EXPOSE 9000
CMD [ "node", "server.js" ]
