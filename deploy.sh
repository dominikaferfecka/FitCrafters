#!/bin/sh

sudo apt-get update
sudo apt-get install python3
sudo apt-get install python3-pip

pip3 install django
sudo apt-get install python3-dev default-libmysqlclient-dev
sudo apt install pkg-config
pip3 install mysqlclient
sudo apt-get install nodejs
sudo apt-get install npm


pip install django django-cors-headers

echo "backend installed"

cd frontend
npm install
npm install react react-dom
npm install react-bootstrap bootstrap
npm install react-router-dom@latest
npm install chart.js
npm update eslint jest
npm install -g n
n latest


echo "frontend installed"

cd ../api
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver&

echo "backend running"

cd ../frontend
npm start

echo "frontend running"
