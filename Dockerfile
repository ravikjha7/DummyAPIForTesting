FROM node:16-alpine3.16

RUN mkdir -p /home/data && echo "[]" > /home/data/employees.json

# create app directory (working directory)
WORKDIR /home

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]