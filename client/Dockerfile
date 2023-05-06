
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

###### production
CMD ["npm", "start"]

###### development
#CMD ["npm", "run", "dev"]