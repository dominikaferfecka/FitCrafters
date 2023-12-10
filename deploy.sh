#!/bin/sh

pip install django django-cors-headers
pip install mysqlclient

echo "backend installed"

cd frontend
npm install
npm install react-bootstrap bootstrap
npm install react-router-dom@latest

echo "frontend installed"

cd ../api
python manage.py makemigrations
python manage.py migrate
python manage.py runserver&

echo "backend running"

cd ../frontend
npm start

echo "frontend running"