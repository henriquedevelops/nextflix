FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma/

RUN npx prisma generate

COPY . /app

EXPOSE 80

CMD ["npm", "start"]
#CMD ["npm", "start", "&", "npx", "prisma", "migrate", "deploy"]