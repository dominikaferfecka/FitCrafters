from django.http import JsonResponse
from datetime import datetime, timedelta
from project.models import Managers
from rest_framework.views import APIView
from rest_framework.decorators import api_view, authentication_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from django.db.models import Count
from .serializers import ManagerSerializer, GymSerializer, EquipmentSerializer, TrainersSerializer, ClientsSerializer,  ClientTrainingsSerializer
from .models import Managers, Gyms, EquipmentType, Trainers, Trainings, GymsEquipmentType, Clients
import json

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
        if request.method == "POST":
            data = json.loads(request.body.decode("utf-8"))
        else:
            data = request.GET
        v_gym_id = data.get("gym")
        v_equipment = GymsEquipmentType.objects.filter(gym=v_gym_id).values_list("equipment", flat=True)
        quantities = GymsEquipmentType.objects.filter(gym=v_gym_id).values('equipment').annotate(count=Count('equipment'))
        equipment = EquipmentType.objects.filter(equipment_id__in=v_equipment)
        data = EquipmentSerializer(equipment, many=True).data
        for quantity, equipment in zip(quantities, data):
            equipment["quantity"] = str(quantity["count"])
        return JsonResponse(data, safe=False)
    
    @api_view(['GET'])
    def getTrainer(request):
        if request.method == "POST":
            data = json.loads(request.body.decode("utf-8"))
        else:
            data = request.GET
        v_gym_id = data.get("gym")
        trainers = Trainers.objects.filter(gym=v_gym_id)
        data = TrainersSerializer(trainers, many=True).data
        return JsonResponse(data, safe=False)
    
    @api_view(['GET'])
    def getTrainerClients(request, trainer_id):
        trainings = Trainings.objects.filter(trainer_id=trainer_id)
        client_ids = trainings.values_list('client_id', flat=True).distinct()

        clients = Clients.objects.filter(client_id__in=client_ids)
        data = ClientsSerializer(clients, many=True).data

        return JsonResponse(data, safe=False)
    
    @api_view(['GET'])
    def getClientTrainings(request, client_id):
        trainings = Trainings.objects.filter(client_id=client_id).select_related('training_plan', 'trainer')
        serializer = ClientTrainingsSerializer(trainings, many=True)
        return JsonResponse(serializer.data, safe=False)


    @csrf_exempt
    def signToTrainer(request):
        data = json.loads(request.body)

        date = data.get('date')
        time = data.get('time')
        trainer_id = data.get('trainer_id')
        client_id = data.get('client_id')
        
        start_datetime = datetime.strptime(date + ' ' + time, '%Y-%m-%d %H:%M')
        end_datetime = start_datetime + timedelta(hours=1)

        training = Trainings(
            start_time=start_datetime,
            end_time=end_datetime,
            trainer_id=trainer_id,
            client_id=client_id
        )
        
        training.save()

        return JsonResponse({'status': 'success'})


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