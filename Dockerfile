FROM node:16.15.1-alpine3.16

RUN apk add --no-cache bash curl && \
    apk add tzdata && \
    cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime

WORKDIR /home/node/app

RUN npm install npm@8.15.0 --location=global && \
    npm install typescript --save-dev && \
    npm install nodemon --location=global

USER node
COPY . .

# CMD ["tail", "-f", "/dev/null"]
CMD ["sh", "-c", "npm install && tail -f /dev/null"]