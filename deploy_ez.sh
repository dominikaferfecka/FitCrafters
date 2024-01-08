cd api
python manage.py makemigrations
python manage.py migrate
python manage.py runserver&

cd ../frontend
npm start