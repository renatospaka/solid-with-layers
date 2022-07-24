#!/bin/bash
npm config set cache /home/node/app/.npm-cache --global

cd /home/node/app

npm install

nodemon -L

#mantém o contêiner executando indefinidamente
tail -f /dev/null
