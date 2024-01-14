from django.http import JsonResponse
from datetime import datetime, timedelta
from project.models import Managers
from rest_framework.views import APIView
from rest_framework.decorators import api_view, authentication_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from django.db.models import Count
from django.db import transaction
from .serializers import ManagerSerializer, GymSerializer, EquipmentSerializer, TrainersSerializer, ClientsSerializer,  ClientTrainingsSerializer, EquipmentAllSerializer, TrainingsExercisesSerializer, GymsEquipmentTypeSerializer
from .models import Managers, Gyms, EquipmentType, Trainers, Trainings, GymsEquipmentType, Clients, TrainingsExercises
import json
from django.utils import timezone
from dateutil import parser
import pytz
tz = pytz.timezone('Europe/Warsaw')

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
        if data.get("gym"):
            v_gym_id = data.get("gym")
            trainers = Trainers.objects.filter(gym=v_gym_id)
        else:
            trainers = Trainers.objects.all()
        data = TrainersSerializer(trainers, many=True).data
        return JsonResponse(data, safe=False)
    
    @api_view(['GET'])
    def getTrainerClients(request, trainer_id):
        trainings = Trainings.objects.filter(trainer_id=trainer_id)
        client_ids = trainings.values_list('client_id', flat=True).distinct()

        clients = Clients.objects.filter(client_id__in=client_ids)
        data = ClientsSerializer(clients, many=True).data

        return JsonResponse(data, safe=False)
    
    # Trainings History 
    # @api_view(['GET'])
    # def getClientTrainings(request, client_id):
    #     trainings = Trainings.objects.filter(client_id=client_id).select_related('training_plan', 'trainer')
    #     serializer = ClientTrainingsSerializer(trainings, many=True)

    #     # Uwzględnij strefę czasową przed wysłaniem odpowiedzi
    #     data_with_localtime = []
    #     for training_data in serializer.data:
    #         training_data['start_time'] = parser.parse(training_data['start_time']).astimezone(tz).strftime('%Y-%m-%d %H:%M')
    #         if training_data['end_time']:
    #             training_data['end_time'] = parser.parse(training_data['end_time']).astimezone(tz).strftime('%Y-%m-%d %H:%M')
    #         print(training_data)
    #         data_with_localtime.append(training_data)

    #     return Response(data_with_localtime)
    

    #history
    @api_view(['GET'])
    def getClientTrainings(request, client_id):
        trainings = Trainings.objects.filter(client_id=client_id).select_related('training_plan', 'trainer')
        done_trainings = []
        for training in trainings:
            doesExist = TrainingsExercises.objects.filter(training = training)
            if doesExist:
                done_trainings.append(training)
        serializer = ClientTrainingsSerializer(done_trainings, many=True)

        # Uwzględnij strefę czasową przed wysłaniem odpowiedzi
        data_with_localtime = []
        for training_data in serializer.data:
            training_data['start_time'] = parser.parse(training_data['start_time']).astimezone(tz).strftime('%Y-%m-%d %H:%M')
            if training_data['end_time']:
                training_data['end_time'] = parser.parse(training_data['end_time']).astimezone(tz).strftime('%Y-%m-%d %H:%M')
            # print("HISTORY" + training_data)
            data_with_localtime.append(training_data)

        return Response(data_with_localtime)
    
    #new
    @api_view(['GET'])
    def getClientTrainingsFuture(request, client_id):
        trainings = Trainings.objects.filter(client_id=client_id).select_related('training_plan', 'trainer')

        new_trainings = []
        for training in trainings:
            doesExist = TrainingsExercises.objects.filter(training = training)
            if not doesExist:
                new_trainings.append(training)
        serializer = ClientTrainingsSerializer(new_trainings, many=True)

        # Uwzględnij strefę czasową przed wysłaniem odpowiedzi
        data_with_localtime = []
        for training_data in serializer.data:
            training_data['start_time'] = parser.parse(training_data['start_time']).astimezone(tz).strftime('%Y-%m-%d %H:%M')
            if training_data['end_time']:
                training_data['end_time'] = parser.parse(training_data['end_time']).astimezone(tz).strftime('%Y-%m-%d %H:%M')
            # print("NEW" + training_data)
            data_with_localtime.append(training_data)

        return Response(data_with_localtime)


    @api_view(['GET'])
    def getClient(request, client_id):
        client = Clients.objects.get(client_id = client_id)
        data= ClientsSerializer(client).data
        return JsonResponse(data)
    
    # @api_view(['GET'])
    # def getTrainingExercises(request, training_id):
    #     try:
    #         training = Trainings.objects.get(training_id=training_id)
    #     except Trainings.DoesNotExist:
    #         return JsonResponse({'error': 'Training not found'}, status=404)

    #     exercises = TrainingsExercises.objects.filter(training=training)
    #     data = TrainingsExercisesSerializer(exercises, many=True).data

    #     return JsonResponse(data, safe=False)

    @api_view(['GET'])
    def getTrainingExercises(request, training_id):
        try:
            training = Trainings.objects.get(training_id=training_id)
        except Trainings.DoesNotExist:
            return JsonResponse({'error': 'Training not found'}, status=404)

        exercises = TrainingsExercises.objects.filter(training=training)
        data = TrainingsExercisesSerializer(exercises, many=True).data
        data_with_localtime = []
        for exercise_data in data:
            exercise_data['start_time'] = parser.parse(exercise_data['start_time']).astimezone(tz).strftime('%Y-%m-%d %H:%M')
            print(exercise_data['start_time'])
            if exercise_data['end_time']:
                exercise_data['end_time'] = parser.parse(exercise_data['end_time']).astimezone(tz).strftime('%Y-%m-%d %H:%M')
            print("Ćwiczenie", exercise_data)
            data_with_localtime.append(exercise_data)

        return JsonResponse(data, safe=False)
    

    @api_view(['GET'])
    def getGymsEquipment(request, gym_id, equipment_id):
        if gym_id == "":
            return JsonResponse({"message": "choose gym"})
        try:
            gyms_equipments = GymsEquipmentType.objects.filter(gym_id=gym_id, equipment_id=equipment_id)
        except GymsEquipmentType.DoesNotExist:
            return JsonResponse({'error': 'Equipment on this gym not found'}, status=404)
        data = GymsEquipmentTypeSerializer(gyms_equipments, many=True).data
        return JsonResponse(data, safe=False)
    # @api_view(['GET'])
    # def getClientsTrainingsWithTrainingPlan(request, client_id):
    #     try:
    #         trainings = Trainings.objects.filter(client_id=client_id)
    #         serializer = ClientTrainingsWithTrainingPlan(trainings, many=True)
    #         return Response(serializer.data)
    #     except Clients.DoesNotExist:
    #         return Response({'error': 'Client not found'}, status=404)
    


    @csrf_exempt
    def signToTrainer(request):
        data = json.loads(request.body)

        date = data.get('date')
        time = data.get('time')
        trainer_id = data.get('trainer_id')
        client_id = data.get('client_id')
        
        start_datetime = datetime.strptime(date + ' ' + time, '%Y-%m-%d %H:%M')
        start_datetime = timezone.make_aware(start_datetime, tz)
        end_datetime = start_datetime + timedelta(hours=1)

        conflicting_trainings = Trainings.objects.filter(
        trainer_id=trainer_id,
        start_time__lt=end_datetime,
        end_time__gt=start_datetime
        )

        if conflicting_trainings.exists():
            return JsonResponse({'status': 'error', 'message': 'Wybrany trener już ma zaplanowany trening na wtedy'})

        training = Trainings(
            start_time=start_datetime,
            end_time=end_datetime,
            trainer=Trainers.objects.get(trainer_id=trainer_id),
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
    def modifyGym(request):
        """
        params: request [json]
        return: status of operation [JSONResoponse]
        method extracts received data and saves modified gym to db
        """

        # load data
        gym_data = json.loads(request.body.decode("utf-8"))
        # extract data
        gym_id = gym_data.get("gymId")
        phone_number = gym_data.get("gymPhone")
        city = gym_data.get("gymCity")
        postal_code = gym_data.get("gymPostalCode")
        street = gym_data.get("gymStreet")
        street_number = gym_data.get("gymStreetNumber")
        building_number = gym_data.get("gymBuildingNumber")
        try:
            # get gym object to modify 
            gym = Gyms.objects.get(gym_id = gym_id)
            # modify fields in gym object
            gym.gym_id = gym_id
            gym.city = city
            gym.postal_code = postal_code
            gym.street = street
            gym.street_number = street_number
            if building_number:
                gym.building_number = building_number
            else:
                gym.building_number = None
            gym.phone_number = phone_number
            # save modified gym to db
            gym.save()
            # return success
            return JsonResponse({"status": "success"})
        except Gyms.DoesNotExist:
            return JsonResponse({"status": "gymDeleted"}, status=501)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=500)

    @csrf_exempt
    def deleteGym(request):
        """
        params: request [json]
        return: status of operation [JSONResoponse]
        method extracts received gym_id and deletes it with all connected objects
        """

        # load data
        gym_data = json.loads(request.body.decode("utf-8"))
        # extract data
        gym_id = gym_data.get("gymId")
        print(gym_id)
        try:
            # get gym to delete
            gym = Gyms.objects.get(gym_id = gym_id)
            # atomic transaction of deleting gym and all connected objects
            with transaction.atomic():
                GymsEquipmentType.objects.filter(gym=gym).delete()
                Trainers.objects.filter(gym=gym_id).delete()
                Gyms.objects.filter(gym_id=gym_id).delete()
            # return success
            return JsonResponse({"status": "success"})
        except Gyms.DoesNotExist:
            return JsonResponse({"status": "gymDeleted"}, status=501)
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
    def modifyTrainer(request):
        """
        params: request [json]
        return: status of operation [JSONResoponse]
        method extracts received data and saves modified trainer to db
        """

        # load data
        trainer_data = json.loads(request.body)
        # extract data
        trainer_id = trainer_data.get("trainerId")
        gym_selected = trainer_data.get("gymSelected")
        trainer_name = trainer_data.get("trainerName")
        trainer_surname = trainer_data.get("trainerSurname")
        trainer_phone = trainer_data.get("trainerPhone")
        trainer_salary = trainer_data.get("trainerSalary")
        trainer_email = trainer_data.get("trainerEmail")
        trainer_pass = trainer_data.get("trainerPass")
        trainer_info = trainer_data.get("trainerInfo")
        try:
            trainer = Trainers.objects.get(trainer_id = trainer_id)
            # save modified data to trainer object
            trainer.name = trainer_name
            trainer.surname = trainer_surname
            trainer.phone_number = trainer_phone
            trainer.email = trainer_email
            trainer.hour_salary = trainer_salary
            trainer.gym = Gyms.objects.get(gym_id = gym_selected)
            trainer.hash_pass = trainer_pass
            trainer.info = trainer_info

            # save trainer with modified data
            trainer.save()
            # return success
            return JsonResponse({"status": "success"})
        except Trainers.DoesNotExist:
            return JsonResponse({"status": "trainerDeleted"}, status=501)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=500)
        
    @csrf_exempt
    def deleteTrainer(request):
        """
        params: request [json]
        return: status of operation [JSONResoponse]
        method extracts received trainer_id and deletes it with all connected objects
        """
        # load data
        trainer_data = json.loads(request.body.decode("utf-8"))
        # extract data
        trainer_id = trainer_data.get("trainerId")
        try:
            # get trainer to delete
            trainer = Trainers.objects.get(trainer_id = trainer_id)
            # atomic transaction of deleting gym and all connected objects
            with transaction.atomic():
                # delete exercises in trainer's trainings 
                TrainingsExercises.objects.filter(training__trainer=trainer).delete()
                # delete trainer's trainings
                Trainings.objects.filter(trainer=trainer).delete()
                # delete trainer
                Trainers.objects.filter(trainer_id=trainer_id).delete()
            # return success
            return JsonResponse({"status": "success"})
        except Trainers.DoesNotExist:
            return JsonResponse({"status": "trainerDeleted"}, status=501)
        except Exception as e:
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
    def modifyEquipment(request):
        """
        params: request [json]
        return: status of operation [JSONResoponse]
        method extracts received data and saves modified equipment to db
        """

        # load data
        equipment_data = json.loads(request.body)
        # extract data
        equipment_serial_no = equipment_data.get("equipmentSerialNumber")
        gym_selected = equipment_data.get("gymSelected")
        equipment_available = equipment_data.get("equipmentAvailable")

        try:
            equipment = GymsEquipmentType.objects.get(serial_number = equipment_serial_no)
            # save modified data to equipment object
            equipment.gym = Gyms.objects.get(gym_id = gym_selected)
            equipment.available = equipment_available

            # save equipment with modified data
            equipment.save()
            # return success
            return JsonResponse({"status": "success"})
        except GymsEquipmentType.DoesNotExist:
            return JsonResponse({"status": "equipmentDeleted"}, status=501)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=500)
        
    @csrf_exempt
    def deleteEquipment(request):
        """
        params: request [json]
        return: status of operation [JSONResoponse]
        method extracts received equipment serial number and deletes equipment with all connected objects
        """

        # load data
        equipment_data = json.loads(request.body.decode("utf-8"))
        # extract data
        equipment_serial_number = equipment_data.get("equipmentSerialNumber")
        if not equipment_serial_number:
            return JsonResponse({"message": "Give equipmentSerialNumber"}, status=500)
        try:
            # get equipment to delete
            equipment = GymsEquipmentType.objects.get(serial_number = equipment_serial_number)
            # atomic transaction of deleting equipment and all connected objects
            with transaction.atomic():
                equipment.delete()
            # return success
            return JsonResponse({"status": "success"})
        except GymsEquipmentType.DoesNotExist:
            return JsonResponse({"status": "equipmentDeleted"}, status=501)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=500)

    @csrf_exempt
    def modifyClient(request):
        """
        params: request [json]
        return: status of operation [JSONResoponse]
        method extracts received data and saves modified client info to db
        """

        # load data
        client_data = json.loads(request.body.decode("utf-8"))
        # extract data
        client_id = client_data.get("clientId")
        name = client_data.get("clientName")
        surname = client_data.get("clientSurname")
        phone_number = client_data.get("clientPhone")
        email = client_data.get("clientEmail")
        hash_pass = client_data.get("clientPass")
        age = client_data.get("clientAge")
        weight = client_data.get("clientWeight")
        height = client_data.get("clientHeight")
        try:
            # get client object to modify 
            client = Clients.objects.get(client_id = client_id)
            # modify fields in client object
            client.name = name
            client.surname = surname
            client.phone_number = phone_number
            client.email = email
            client.hash_pass = hash_pass
            client.age = age
            client.weight = weight
            client.height = height
            # save modified client to db
            client.save()
            # return success
            return JsonResponse({"status": "success"})
        except Clients.DoesNotExist:
            return JsonResponse({"status": "clientDeleted"}, status=501)
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