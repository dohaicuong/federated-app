FROM node:12.13

WORKDIR /etc/app
COPY ./package.json .
RUN yarn

RUN yarn global add prisma
COPY . .
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT /entrypoint.sh