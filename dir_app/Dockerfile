FROM node:alpine3.11
WORKDIR /usr/src/web_db_rest
COPY . /usr/src/web_db_rest
RUN yarn install
EXPOSE 9010
CMD ["yarn", "dev"]

