#!/bin/sh

pip install django django-cors-headers
pip install mysqlclient

echo "backend installed"

cd frontend
npm install@latest
npm install react-bootstrap bootstrap
npm install react-router-dom@latest
npm install chart.js

echo "frontend installed"

cd ../api
python manage.py makemigrations
python manage.py migrate
Start-Process python -ArgumentList "manage.py", "runserver" -NoNewWindow -PassThru

echo "backend running"

cd ../frontend
npm start

echo "frontend running"