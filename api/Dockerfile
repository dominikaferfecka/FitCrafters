FROM  python:3.11.4

ENV PYTHONUNBUFFERED=1

WORKDIR /api

RUN pip install django django-cors-headers
RUN pip install mysqlclient

COPY . . 

RUN python manage.py makemigrations
RUN python manage.py migrate

EXPOSE 8000