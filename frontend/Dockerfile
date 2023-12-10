FROM node:20.10.0

WORKDIR /frontend

COPY . .

RUN npm install
RUN npm install react-bootstrap bootstrap
RUN cd frontend
RUN npm install react-router-dom@latest

EXPOSE 3000

CMD ["npm", "start"]