# Generator wykonywania ćwiczeń

## Sposób działania

Generator co 5 minut sprawdza czy istnieje trening rozpoczęty od ostatniego sprawdzenia
Jeśli jakieś istnieją, dla każdego z nich uruchamia task celery do generowania ćwiczeń

Task pobiera każde ćwiczenie z treningu z tabeli exercises_training_plans i generuje półlosowe dane,
następnie zapisuje wygenerowane odbyte ćwiczenie do tabeli trainings_exercises

Do uruchomienia generatora potrzebujemy modułów:

- celery[redis]
- redis
- eventlet (niezbędne dla Windowsa)

#### Uruchamiamy celery z katalogu pzsp2-fitcrafters/generator:

celery -A generator worker -l info -P eventlet

#### Uruchamiamy celery beat z katalogu pzsp2-fitcrafters/generator:

celery -A generator beat --loglevel=info
