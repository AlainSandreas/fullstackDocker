FROM node:lts-slim

RUN mkdir -p /Users/mbelloun/Desktop/blackbones/app

COPY package*.json ./

WORKDIR /Users/mbelloun/Desktop/blackbones/app

COPY . .

EXPOSE 5000

# You can change this
CMD [ "npm", "start" ]
