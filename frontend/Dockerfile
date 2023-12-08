FROM node:20.10.0

WORKDIR /frontend

COPY . .

RUN npm install
RUN npm install bootstrap@latest

EXPOSE 3000

CMD ["npm", "start"]