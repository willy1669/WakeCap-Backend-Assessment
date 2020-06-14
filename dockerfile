FROM node:12-stretch

USER node

RUN mkdir -p /home/node/src/server

WORKDIR /home/node/src/server

COPY --chown=node:node package-lock.json package.json ./

RUN npm ci

COPY  --chown=node:node . .

RUN npm ci

EXPOSE 3000 

CMD ["node", "app.js"]



