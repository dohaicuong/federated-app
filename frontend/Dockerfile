FROM node:12.13

WORKDIR /etc/app
COPY ./package.json .
RUN yarn

COPY . .

ENTRYPOINT yarn start