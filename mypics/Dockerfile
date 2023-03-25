FROM node:latest
WORKDIR /mypics
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN npm ci
COPY ./app.cjs ./connection.cjs ./index.cjs /mypics/
CMD ["node", "app.cjs"]