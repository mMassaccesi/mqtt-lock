FROM node:latest

RUN mkdir -p /registros
WORKDIR /registros

RUN npm install -g nodemon
COPY package*.json /registros/
RUN npm install
RUN mv /registros/node_modules /node_modules

COPY . /registros

EXPOSE 5000

CMD [ "npm", "start" ]