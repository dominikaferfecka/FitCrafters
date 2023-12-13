from django.http import JsonResponse
from datetime import datetime
from project.models import Managers
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ManagerSerializer
from .models import Managers

class DataBaseAPIView(APIView):
    @api_view(['GET'])
    def get(request):
        print(request.headers)
        manager= Managers.objects.first()
        data= ManagerSerializer(manager).data
        print(data)
        return JsonResponse(data)

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