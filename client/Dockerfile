
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

#RUN npm run build

EXPOSE 3000

#CMD ["npm", "start"]
CMD [ "npm", "run", "dev" ]