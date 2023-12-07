from django.http import JsonResponse
from datetime import datetime
from project.models import Managers

def index(request):
    manager = Managers.objects.first()

    if manager:
        manager_name = manager.name + ' ' + manager.surname
    else:
        manager_name = "Brak danych o managerze"

    data = {
        'manager_name': manager_name,
    }

    return JsonResponse(data)