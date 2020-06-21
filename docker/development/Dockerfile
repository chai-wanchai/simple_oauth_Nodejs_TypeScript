FROM node:10.1.0

RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm install -g express
RUN npm install -g nodemon
RUN npm install -g pm2
RUN npm install

EXPOSE 3000
CMD ["npm","run","dev"]
