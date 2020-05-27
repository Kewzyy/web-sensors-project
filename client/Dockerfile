FROM mhart/alpine-node:latest
WORKDIR /client
COPY package*.json /client/
RUN npm install
COPY . /client/
CMD ["npm", "start"]
