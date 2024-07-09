FROM node:20

WORKDIR /usr/src/app

COPY package* .

RUN npm install 

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "index.js"]

