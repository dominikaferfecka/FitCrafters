from django.http import JsonResponse
from datetime import datetime, timedelta
from project.models import Managers
from rest_framework.views import APIView
from rest_framework.decorators import api_view, authentication_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from django.db.models import Count
from .serializers import ManagerSerializer, GymSerializer, EquipmentSerializer, TrainersSerializer, ClientsSerializer,  ClientTrainingsSerializer, EquipmentAllSerializer, TrainerTrainingsSerializer
from .models import Managers, Gyms, EquipmentType, Trainers, Trainings, GymsEquipmentType, Clients
import json

class DataBaseAPIView(APIView):
    @api_view(['GET'])
    def getManagerName(request):
        manager= Managers.objects.first()
        data= ManagerSerializer(manager).data
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
        if(data.get("gym")):
            v_gym_id = data.get("gym")
            v_equipment = GymsEquipmentType.objects.filter(gym=v_gym_id).values_list("equipment", flat=True)
            quantities = GymsEquipmentType.objects.filter(gym=v_gym_id).values('equipment').annotate(count=Count('equipment'))
            equipment = EquipmentType.objects.filter(equipment_id__in=v_equipment)
            data = EquipmentSerializer(equipment, many=True).data
            for quantity, equipment in zip(quantities, data):
                equipment["quantity"] = str(quantity["count"])
        else:
            equipment = EquipmentType.objects.all()
            data = EquipmentAllSerializer(equipment, many=True).data
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

    @csrf_exempt
    def addGym(request):
        """
        params: request [json]
        return: status of operation [JSONResoponse]
        method extracts received data and saves new gym to db
        """

        # load data
        gym_data = json.loads(request.body.decode("utf-8"))
        # extract data
        phone_number = gym_data.get("gymPhone")
        city = gym_data.get("gymCity")
        postal_code = gym_data.get("gymPostalCode")
        street = gym_data.get("gymStreet")
        street_number = gym_data.get("gymStreetNumber")
        building_number = gym_data.get("gymbuildingNumber")
        try:
            gym_id = Gyms.objects.order_by('-gym_id').first().gym_id + 1
        except Exception:
            gym_id = 1
        try:
            # create Gyms object to save
            gym = Gyms(
                # get next available id - workaround
                gym_id = gym_id,
                city = city,
                postal_code = postal_code,
                street = street,
                street_number = street_number,
                building_number = building_number,
                manager = Managers.objects.get(manager_id = 1),
                phone_number = phone_number,
            )
            # save new gym to db
            gym.save()
            # return success
            return JsonResponse({"status": "success"})
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=500)

    @csrf_exempt
    def addTrainer(request):
        """
        params: request [json]
        return: status of operation [JSONResoponse]
        method extracts received data and saves new trainer to db
        """

        # load data
        trainer_data = json.loads(request.body)
        # extract data
        gym_selected = trainer_data.get("gymSelected")
        trainer_name = trainer_data.get("trainerName")
        trainer_surname = trainer_data.get("trainerSurname")
        trainer_phone = trainer_data.get("trainerPhone")
        trainer_salary = trainer_data.get("trainerSalary")
        trainer_email = trainer_data.get("trainerEmail")
        trainer_pass = trainer_data.get("trainerPass")
    
        try:
            trainer_id = Trainers.objects.order_by('-trainer_id').first().trainer_id_id + 1
        except Exception:
            trainer_id = 1

        try:
            # create Trainers object to save
            trainer = Trainers(
                # get next available id - workaround
                trainer_id = trainer_id,
                name = trainer_name,
                surname = trainer_surname,
                phone_number = trainer_phone,
                email = trainer_email,
                hour_salary = trainer_salary,
                gym = Gyms.objects.get(gym_id = gym_selected),
                hash_pass = trainer_pass,
                info = "",
            )
            # save new gym to db
            trainer.save()
            # return success
            return JsonResponse({"status": "success"})
        except Exception as e:
            print(str(e))
            return JsonResponse({"message": str(e)}, status=500)
        
    @csrf_exempt
    def addEquipment(request):
        """
        params: request [json]
        return: status of operation [JSONResoponse]
        method extracts received data and saves new equipment to certain gym to db
        """

        # load data
        equipment_data = json.loads(request.body)
        # extract data
        selected_gym = equipment_data.get("gymSelected")
        equipment_id = equipment_data.get("equipmentId")
        equipment_serial_no = equipment_data.get("equipmentSerialNo")
        try:
            # create GymsEquipmentType object to save
            gym_equipment = GymsEquipmentType(
                gym_id = selected_gym,
                equipment_id = equipment_id,
                available = 1,
                used = 0,
                serial_number = equipment_serial_no,
            )

            # save new equipment type to gym to db
            gym_equipment.save()
            # return success
            return JsonResponse({"status": "success"})
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=500)
        
                
    @csrf_exempt
    def getTrainerTrainings(request):
        """
        params: request [json]
        return: info about trainer's trainings  [JSONResoponse]
        method extracts received data and returns info about trainer's trainings"""
        # load data
        if request.method == "POST":
            v_trainer_data = json.loads(request.body.decode("utf-8"))
        else:
            v_trainer_data = request.GET
        
        v_trainer_id = v_trainer_data.get("trainer_id")
        # extract data
        try:
            # create GymsEquipmentType object to save
            trainings = Trainings.objects.filter(trainer_id=v_trainer_id).select_related('client')
            serializer = TrainerTrainingsSerializer(trainings, many=True)
            # return success
            return JsonResponse(serializer.data, safe=False)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=500)
        
    
    @csrf_exempt
    def deleteTraining(request):
        """
        params: request [json]
        return: status of operation [JSONResoponse]
        method delete trainings with given training_id"""
        # load data
        if request.method == "POST":
            v_training_data = json.loads(request.body.decode("utf-8"))
        else:
            v_training_data = request.GET
        
        v_training_id = v_training_data.get("training_id")
        # extract data
        try:
            trainings = Trainings.objects.filter(training_id=v_training_id).delete()
            # return success
            return JsonResponse({"status": "success"})
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=500)

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


