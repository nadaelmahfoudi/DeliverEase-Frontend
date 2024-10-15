FROM node:20
WORKDIR /DeliverEaseFront
COPY package.json .
RUN npm install
COPY  . .
ENV HOST=0.0.0.0
EXPOSE 5173
CMD [ "npm" , "run" ,"dev" ]