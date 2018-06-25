FROM node:latest

RUN mkdir -p /cerradura
WORKDIR /cerradura

RUN npm install -g nodemon
COPY package*.json /cerradura
RUN npm install
RUN mv /cerradura/node_modules /node_modules

COPY . /cerradura

EXPOSE 5000

CMD [ "npm", "start" ]