FROM node:latest
WORKDIR /mypics
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN npm ci
COPY ./mypics/src/Backend/RabbitMQ/app.cjs ./mypics/src/Backend/RabbitMQ/connection.cjs ./mypics/src/Backend/RabbitMQ/index.cjs /mypics/src/Backend/RabbitMQ/
CMD ["node", "app.cjs"]