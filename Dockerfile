FROM node:18-alpine
WORKDIR /avito-trainee-assignment/
COPY package.json /avito-trainee-assignment
RUN npm install
COPY . /avito-trainee-assignment/
EXPOSE 7070
CMD ["npm", "start"]
