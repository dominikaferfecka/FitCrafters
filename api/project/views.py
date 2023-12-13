from django.http import JsonResponse
from datetime import datetime
from project.models import Managers
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ManagerSerializer, GymSerializer, EquipmentSerializer, TrainersSerializer
from .models import Managers, Gyms, EquipmentType, Trainers

class DataBaseAPIView(APIView):
    @api_view(['GET'])
    def getManagerName(request):
        print(request.headers)
        manager= Managers.objects.first()
        data= ManagerSerializer(manager).data
        print(data)
        return JsonResponse(data)
    
    @api_view(['GET'])
    def getManagerGyms(request):
        v_manager_id = request.GET['manager_id']
        gyms = Gyms.objects.filter(manager_id=v_manager_id)
        data = GymSerializer(gyms, many=True).data
        return JsonResponse(data, safe=False)
    
    @api_view(['GET'])
    def getEquipment(request):
        equipment = EquipmentType.objects.all()
        data = EquipmentSerializer(equipment, many=True).data
        return JsonResponse(data, safe=False)
    
    @api_view(['GET'])
    def getTrainer(request):
        trainers = Trainers.objects.all()
        data = TrainersSerializer(trainers, many=True).data
        return JsonResponse(data, safe=False)



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