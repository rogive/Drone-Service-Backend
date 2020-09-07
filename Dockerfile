FROM node:latest

WORKDIR /usr/src/

COPY . .

RUN npm install --production

EXPOSE 8000

CMD npm run dev

