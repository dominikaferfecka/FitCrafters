FROM  python:3.11.4

ENV PYTHONUNBUFFERED=1

WORKDIR /api

RUN pip install django django-cors-headers

COPY . . 

EXPOSE 8000