FROM node:alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
EXPOSE 8081
RUN pwd && ls -l models
CMD ["npm", "start"]