FROM node:12.13

WORKDIR /etc/app
COPY ./package.json .
RUN yarn

COPY . .

COPY ./wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT /entrypoint.sh