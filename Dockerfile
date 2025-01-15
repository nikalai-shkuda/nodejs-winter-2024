FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5050
EXPOSE 9229

CMD ["npm", "run", "start"]
