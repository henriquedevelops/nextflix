
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

###### production
RUN npm run build
CMD ["npm", "start"]

###### development
#CMD ["npm", "run", "dev"]