FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma/

RUN npx prisma generate

COPY . /app

EXPOSE 80


#development:
#CMD ["npm", "start"]

#production:
CMD ["npx", "ts-node", "src/app.ts"]