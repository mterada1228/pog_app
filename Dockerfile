ARG NODE_VER
FROM node:${NODE_VER}

COPY ./react-app /home/node/react-app
WORKDIR /home/node/react-app

CMD ["/bin/bash", "-c", "yarn install && yarn start"]
