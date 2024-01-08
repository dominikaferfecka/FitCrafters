from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# Ustawienia dla Celery
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'generator.settings')

app = Celery('generator')

# Konfiguracja Celery przy użyciu ustawień Django z pliku settings.py
app.config_from_object('django.conf:settings', namespace='CELERY')

# Automatycznie odkrywaj zadania w pliku tasks.py w każdej z aplikacji
app.autodiscover_tasks()
