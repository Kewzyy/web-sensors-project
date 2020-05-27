FROM mhart/alpine-node:latest
WORKDIR /api
COPY package*.json /api/
RUN npm install
COPY . /api/
CMD ["npm", "start"]
