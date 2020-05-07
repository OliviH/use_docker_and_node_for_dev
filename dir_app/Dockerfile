FROM node:alpine3.11
WORKDIR /usr/src/dir_app
COPY . /usr/src/dir_app
RUN yarn install
EXPOSE 9010
CMD ["yarn", "dev"]
