FROM node


WORKDIR /usr/app

COPY package.json ./


COPY . .

EXPOSE 3333

RUN npm run typeorm migration:run

CMD ["npm", "run", "dev"]
