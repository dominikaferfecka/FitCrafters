from django.http import JsonResponse
from datetime import datetime, timedelta
from project.models import Managers
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import make_password, check_password
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from django.db.models import Count
from django.db import transaction
from .serializers import ManagerSerializer, GymSerializer, EquipmentSerializer, TrainersSerializer, ClientsSerializer,  ClientTrainingsSerializer, EquipmentAllSerializer, TrainingsExercisesSerializer, GymsEquipmentTypeSerializer, TrainingPlansSerializer, TrainerTrainingsSerializer, ExercisesTrainingPlansSerializer
from .models import Managers, Gyms, EquipmentType, Trainers, Trainings, GymsEquipmentType, Clients, TrainingsExercises, TrainingPlans, Tokens, ExercisesTrainingPlans, Exercises
import json
from django.utils import timezone
from dateutil import parser
import pytz
from django.utils.dateparse import parse_datetime
from django.db.models.functions import TruncDate

tz = pytz.timezone('Europe/Warsaw')

class AuthAPIView(APIView):
    @api_view(['POST'])
    def signup(request):
        """
        params: request [json]
        return: status of operation (and data if status correct) [JSONResoponse]
        method creates new client and token
        """
        try:
            # load data
            data = request.data
            # get client_id - next one or 1 if there is no clients
            try:
                client_id = Clients.objects.order_by('-client_id').first().client_id + 1
            except Exception:
                client_id = 1
            data["client_id"] = client_id
            serializer = ClientsSerializer(data=data)
            if serializer.is_valid():
                # Create client with request data
                client = Clients.objects.create(
                    client_id=client_id,
                    name=request.data['name'],
                    surname=request.data['surname'],
                    phone_number=request.data['phone_number'],
                    email=request.data['email'],
                    age=request.data['age'],
                    weight=request.data['weight'],
                    height=request.data['height'],
                    # hash password
                    hash_pass=make_password(request.data['hash_pass'])
                )
                # create user and user token as atomic transaction
                with transaction.atomic():
                    # save client to db
                    client.save()
                    # create token for client
                    client_token, client_token_created = Tokens.objects.get_or_create(client=client, manager=None, trainer=None)
                return Response({"token": client_token.key, "client": serializer.data}, status=201)
            else:
                return Response(serializer.errors, status=400)
        except Exception as e:
            print(str(e))
            return Response({"message": str(e)}, status=500)

    @api_view(['POST'])
    def login(request):
        """
        params: request [json]
        return: status of operation (and data if status correct) [JSONResoponse]
        method checks user's credentials and permissions and if they are correct
        it navigates to certain UserPage
        """
        try:
            # get data to log in
            email = request.data.get('email')
            password = request.data.get('hash_pass')
            user_role = request.data.get('user')

            # get user depending on role
            if user_role == "klient":
                user = Clients.objects.get(email=email)
            elif user_role == "menadżer":
                user = Managers.objects.get(email=email)
            elif user_role == "trener":
                user = Trainers.objects.get(email=email)

            # check if given password was correct
            if check_password(password, user.hash_pass):
                # get / create tokens for users if password is correct
                if user_role == "klient":
                    token, created = Tokens.objects.get_or_create(client=user, manager=None, trainer=None)
                    serializer = ClientsSerializer(user)
                elif user_role == "menadżer":
                    token, created = Tokens.objects.get_or_create(manager=user, trainer=None, client=None)
                    serializer = ManagerSerializer(user)
                elif user_role == "trener":
                    token, created = Tokens.objects.get_or_create(trainer=user, client=None, manager=None)
                    serializer = TrainersSerializer(user)
                # return token and user data
                return Response({"token_key":  token.key, "token_client_id": token.client_id, "token_trainer_id": token.trainer_id, "token_manager_id": token.manager_id, "user": serializer.data, "role": user_role}, status=200)
            else:
                # password incorrect
                return Response({"detail": "Invalid credentials."}, status=401)
        except Clients.DoesNotExist:
            # client with given email address was not found
            return Response({"detail": "User not found."}, status=404)
        except Trainers.DoesNotExist:
            # trainer with given email address was not found
            return Response({"detail": "User not found."}, status=404)
        except Managers.DoesNotExist:
            # manager with given email address was not found
            return Response({"detail": "User not found."}, status=404)
        except Exception as e:
            # other errors
            return Response({"message": str(e)}, status=500)
        

class DataBaseAPIView(APIView):
    @api_view(['GET'])
    def getManagerName(request):
        """
        params: request [json]
        return: data of Manager object[JSONResoponse]
        method returns manager's data 
        """
        manager= Managers.objects.first()
        data= ManagerSerializer(manager).data
        return JsonResponse(data)
    
    @api_view(['GET'])
    def getManagerGyms(request):
        """
        params: request [json]
        return: data of multiple gyms [JSONResoponse]
        method returnes all gyms that are maintained by given manager
        """
        v_manager_id = request.GET['manager_id']
        gyms = Gyms.objects.filter(manager_id=v_manager_id)
        data = GymSerializer(gyms, many=True).data
        return JsonResponse(data, safe=False)
    
    @api_view(['GET'])
    def getEquipment(request):
        """
        params: request [json]
        return: data of EquipmentType object [JSONResoponse]
        method returnes EquipmentType objects - if gym was given it filters it through that gym
        """
        if request.method == "POST":
            data = json.loads(request.body.decode("utf-8"))
        else:
            data = request.GET
        # if param had gym, filter GymsEquipmentType
        if(data.get("gym")):
            v_gym_id = data.get("gym")
            v_equipment = GymsEquipmentType.objects.filter(gym=v_gym_id).values_list("equipment", flat=True)
            quantities = GymsEquipmentType.objects.filter(gym=v_gym_id).values('equipment').annotate(count=Count('equipment'))
            equipment = EquipmentType.objects.filter(equipment_id__in=v_equipment)
            data = EquipmentSerializer(equipment, many=True).data
            for quantity, equipment in zip(quantities, data):
                equipment["quantity"] = str(quantity["count"])
        # return all EquipmentType
        else:
            equipment = EquipmentType.objects.all()
            data = EquipmentAllSerializer(equipment, many=True).data
        return JsonResponse(data, safe=False)
    
    @csrf_exempt
    def getTrainer(request):
        """
        params: request [json]
        return: data of Trainers object [JSONResoponse]
        if method is given gym, it returnes all Trainers that are connected to this gym
        if method is given token, it returnes Trainer that has this token in database
        """
        if request.method == "POST":
            data = json.loads(request.body.decode("utf-8"))
        else:
            data = request.GET
        # if param is gym, filter Trainers by gym
        if data.get("gym"):
            v_gym_id = data.get("gym")
            trainers = Trainers.objects.filter(gym=v_gym_id)
        # if param is token, return Trainer with this token
        elif data.get("token"):
            token = data.get("token")
            trainer_id = Tokens.objects.get(key=token).trainer_id
            trainers = Trainers.objects.get(trainer_id = trainer_id)
            data = TrainersSerializer(trainers).data
            return JsonResponse(data)
        # if there are no params, return all trainers
        else:
            trainers = Trainers.objects.all()
        data = TrainersSerializer(trainers, many=True).data
        return JsonResponse(data, safe=False)
    
    @api_view(['GET'])
    def getTrainerClients(request, trainer_id):
        """
        params: request [json], trainer_id [int]
        return: data of Clients object [JSONResoponse]
        method returns all clients that have trainings with given trainer
        """
        # get trainings by given trainer_id
        trainings = Trainings.objects.filter(trainer_id=trainer_id)
        # get client_id from given trainings, distinct
        client_ids = trainings.values_list('client_id', flat=True).distinct()
        clients = Clients.objects.filter(client_id__in=client_ids)
        data = ClientsSerializer(clients, many=True).data
        return JsonResponse(data, safe=False)
    
    #history
    @api_view(['GET'])
    def getClientTrainings(request, client_id):
        """
        params: request [json], client_id [int]
        return: data of Trainings object [JSONResoponse]
        method returns all done trainings by given client
        """
        # get all trainings connected to given clienet
        trainings = Trainings.objects.filter(client_id=client_id).select_related('training_plan', 'trainer')
        done_trainings = []
        # check which of them where made
        for training in trainings:
            doesExist = TrainingsExercises.objects.filter(training = training)
            if doesExist:
                done_trainings.append(training)
        serializer = ClientTrainingsSerializer(done_trainings, many=True)

        # add timezone to time
        data_with_localtime = []
        for training_data in serializer.data:
            training_data['start_time'] = parser.parse(training_data['start_time']).astimezone(tz).strftime('%Y-%m-%d %H:%M')
            if training_data['end_time']:
                training_data['end_time'] = parser.parse(training_data['end_time']).astimezone(tz).strftime('%Y-%m-%d %H:%M')
            data_with_localtime.append(training_data)
        # return History Trainings
        return Response(data_with_localtime)
    
    #new
    @api_view(['GET'])
    def getClientTrainingsFuture(request, client_id):
        """
        params: request [json], client_id [int]
        return: data of Trainings object [JSONResoponse]
        method returns all not done trainings by given client
        """
        trainer_id = request.GET.get('trainer_id', None)
        trainings = Trainings.objects.filter(client_id=client_id).select_related('training_plan', 'trainer')
        if trainer_id:
            trainings = trainings.filter(trainer_id=trainer_id)

        # filter not done trainings
        new_trainings = []
        for training in trainings:
            doesExist = TrainingsExercises.objects.filter(training=training)
            if not doesExist:
                new_trainings.append(training)

        serializer = ClientTrainingsSerializer(new_trainings, many=True)
        # fix timezone time
        data_with_localtime = []
        for training_data in serializer.data:
            training_data['start_time'] = parser.parse(training_data['start_time']).astimezone(tz).strftime('%Y-%m-%d %H:%M')
            if training_data['end_time']:
                training_data['end_time'] = parser.parse(training_data['end_time']).astimezone(tz).strftime('%Y-%m-%d %H:%M')
            data_with_localtime.append(training_data)

        return Response(data_with_localtime)



    @api_view(['GET'])
    def getClient(request, token):
        """
        params: request [json], token [str]
        return: data of Clients object [JSONResoponse]
        method returns Client who connects to given token
        """
        client_id = Tokens.objects.get(key = token).client_id
        client = Clients.objects.get(client_id = client_id)
        data= ClientsSerializer(client).data
        return JsonResponse(data)

    @api_view(['GET'])
    def getTrainingExercises(request, training_id):
        """
        params: request [json], training_id [int]
        return: data of TrainingsExercises object [JSONResoponse]
        method returns all not done trainings by given client
        """
        try:
            training = Trainings.objects.get(training_id=training_id)
        except Trainings.DoesNotExist:
            return JsonResponse({'error': 'Training not found'}, status=404)

        # get TrainingsExercises from given training
        exercises = TrainingsExercises.objects.filter(training=training)
        data = TrainingsExercisesSerializer(exercises, many=True).data
        # fix timezone in start_time and end_time
        data_with_localtime = []
        for training_data in data:
            training_data['start_time'] = parser.parse(training_data['start_time']).astimezone(tz).strftime('%Y-%m-%d %H:%M')
            if training_data['end_time']:
                training_data['end_time'] = parser.parse(training_data['end_time']).astimezone(tz).strftime('%Y-%m-%d %H:%M')
            data_with_localtime.append(training_data)

        return JsonResponse(data_with_localtime, safe=False)
    

    @api_view(['GET'])
    def getGymsEquipment(request, gym_id, equipment_id):
        """
        params: request [json], gym_id [int], equipment_id [int]
        return: data of GymsEquipmentType object [JSONResoponse]
        method returns GymsEquipmentType objects which connect to given gym and equipment_type
        """
        # check if gym_id was given
        if gym_id == "":
            return JsonResponse({"message": "choose gym"})
        # find GymsEquipmentType or raise exception
        try:
            gyms_equipments = GymsEquipmentType.objects.filter(gym_id=gym_id, equipment_id=equipment_id)
        except GymsEquipmentType.DoesNotExist:
            return JsonResponse({'error': 'Equipment on this gym not found'}, status=404)
        # return data
        data = GymsEquipmentTypeSerializer(gyms_equipments, many=True).data
        return JsonResponse(data, safe=False)

    @api_view(['GET'])
    def getTrainingPlans(request):
        """
        params: request [json]
        return: data of TrainingsPlans object [JSONResoponse]
        method returns all training plans
        """
        training_plans = TrainingPlans.objects.all()
        data = TrainingPlansSerializer(training_plans, many=True).data
        return JsonResponse(data, safe=False)
    
    @csrf_exempt
    def signToTrainer(request):
        """
        params: request [json]
        return: status of operation [JSONResoponse]
        method signs up client to given trainer for given time and date
        """
        data = json.loads(request.body)
        # unpack data
        date = data.get('date')
        time = data.get('time')
        trainer_id = data.get('trainer_id')
        client_id = data.get('client_id')
        # fix timezone
        start_datetime = datetime.strptime(date + ' ' + time, '%Y-%m-%d %H:%M')
        start_datetime = timezone.make_aware(start_datetime, tz)
        end_datetime = start_datetime + timedelta(hours=1)
        # check for conflicting trainings in trainer
        conflicting_trainings = Trainings.objects.filter(
        trainer_id=trainer_id,
        start_time__lt=end_datetime,
        end_time__gt=start_datetime
        )
        # if there is conflict raise exception
        if conflicting_trainings.exists():
            return JsonResponse({'status': 'error', 'message': 'Wybrany trener już ma zaplanowany trening na wtedy'})
        # save training to db
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
            trainer_id = Trainers.objects.order_by('-trainer_id').first().trainer_id + 1
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
                hash_pass = make_password(trainer_pass),
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
            if trainer_pass:
                trainer.hash_pass = make_password(trainer_pass)
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
            if hash_pass:
                client.hash_pass = make_password(hash_pass)
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


    @api_view(['POST'])
    def updateTrainingPlan(request):
        """
        params: request [json]
        return: status of operation [JSONResoponse]
        method updates training plan in given training
        """
        try:
            # Load data
            form_data = request.data

            # extract data
            date = form_data.get("date")
            time = form_data.get("time")
            selected_plan_id = form_data.get("selectedTrainingPlanId")
            client_id_trainer = form_data.get("clientIdTrainer")
            trainer_id = form_data.get("trainerId")
            print(f"AAA: {selected_plan_id}")

            time_with_seconds = f"{time}"
            datetime_str = f"{date} {time_with_seconds}"
            training_datetime = datetime.strptime(datetime_str, '%Y-%m-%d %H:%M:%S')
            start_time = timezone.make_aware(training_datetime, tz)

            training = Trainings.objects.get(start_time=start_time, client_id=client_id_trainer, trainer = trainer_id)
            #training = Trainings.objects.get(start_time=start_time, client_id=client_id_trainer)

            with transaction.atomic():
                training_plan = TrainingPlans.objects.get(training_plan_id=selected_plan_id)

                training.training_plan = training_plan
                training.save()

            # Return a success message
            return Response({"status": "success"})

        except Exception as e:
            # Return an error message if an exception occurs
            return Response({"message": str(e)}, status=500)
        

    # Statistics

    @api_view(['GET'])
    def getClientTrainingStatsCalories(request, client_id):
        """
        params: request [json], client_id [int]
        return: labels, data [json]
        method gets stats about calories from given client
        """
        start_date_str = request.query_params.get('startDate', None)
        end_date_str = request.query_params.get('endDate', None)

        start_date = parse_datetime(start_date_str) if start_date_str else None
        end_date = parse_datetime(end_date_str) if end_date_str else None

        # get trainings in date time range
        trainings = Trainings.objects.filter(client_id=client_id, start_time__gte=start_date, end_time__lte=end_date).order_by('start_time')

        # prepare data for statistics
        labels = []
        data = []

        for training in trainings:
            does_exist = TrainingsExercises.objects.filter(training=training)
            if does_exist:
                total_calories = sum(exercise.calories for exercise in does_exist)
                labels.append(training.start_time.strftime('%Y-%m-%d'))
                data.append(total_calories)

        return Response({'labels': labels, 'data': data})
    
    @api_view(['GET'])
    def getClientTrainingStatsDuration(request, client_id):
        """
        params: request [json], client_id [int]
        return: labels, data [json]
        method gets stats about duration of trainings from given client
        """
        start_date_str = request.query_params.get('startDate', None)
        end_date_str = request.query_params.get('endDate', None)

        start_date = parse_datetime(start_date_str) if start_date_str else None
        end_date = parse_datetime(end_date_str) if end_date_str else None

        # get trainings in date time range
        trainings = Trainings.objects.filter(client_id=client_id, start_time__gte=start_date, end_time__lte=end_date).order_by('start_time')

        # prepare data for statistics
        labels = []
        data = []

        for training in trainings:
            does_exist = TrainingsExercises.objects.filter(training=training)
            if does_exist:
                total_duration = sum((exercise.end_time - exercise.start_time).seconds for exercise in does_exist)
                labels.append(training.start_time.strftime('%Y-%m-%d'))
                data.append(total_duration)

        return Response({'labels': labels, 'data': data})


    from django.db.models import Count

    @api_view(['GET'])
    def getClientStatsPlansCategoryCount(request, client_id):
        """
        params: request [json], client_id [int]
        return: labels, data [json]
        method gets stats about category of trainings from given client
        """
        start_date_str = request.query_params.get('startDate', None)
        end_date_str = request.query_params.get('endDate', None)

        start_date = parse_datetime(start_date_str) if start_date_str else None
        end_date = parse_datetime(end_date_str) if end_date_str else None

        # get trainings in date time range
        trainings = Trainings.objects.filter(client_id=client_id, start_time__gte=start_date, end_time__lte=end_date).order_by('start_time')

        # count trainings for each category of training plans
        training_counts = Trainings.objects.filter(
            client_id=client_id,
            start_time__gte=start_date,
            end_time__lte=end_date
        ).values('training_plan__category').annotate(count=Count('training_plan__category'))

        # prepare data for statistics
        labels = [count['training_plan__category'] for count in training_counts]
        data = [count['count'] for count in training_counts]

        return Response({'labels': labels, 'data': data})

    @api_view(['GET'])
    def getClientStatsPlansNameCount(request, client_id):
        """
        params: request [json], client_id [int]
        return: labels, data [json]
        method gets stats about names of trainings from given client
        """
        start_date_str = request.query_params.get('startDate', None)
        end_date_str = request.query_params.get('endDate', None)

        start_date = parse_datetime(start_date_str) if start_date_str else None
        end_date = parse_datetime(end_date_str) if end_date_str else None

        # get trainings in date time range
        trainings = Trainings.objects.filter(client_id=client_id, start_time__gte=start_date, end_time__lte=end_date).order_by('start_time')

        # count trainings for each training plan (name)
        training_counts = Trainings.objects.filter(
            client_id=client_id,
            start_time__gte=start_date,
            end_time__lte=end_date
        ).values('training_plan__name').annotate(count=Count('training_plan__name'))

        # prepare data for statistics
        labels = [count['training_plan__name'] for count in training_counts]
        data = [count['count'] for count in training_counts]

        return Response({'labels': labels, 'data': data})

    @api_view(['GET'])
    def getClientStatsTrainerCount(request, client_id):
        """
        params: request [json], client_id [int]
        return: labels, data [json]
        method gets stats about trainers of trainings from given client
        """
        start_date_str = request.query_params.get('startDate', None)
        end_date_str = request.query_params.get('endDate', None)

        start_date = parse_datetime(start_date_str) if start_date_str else None
        end_date = parse_datetime(end_date_str) if end_date_str else None

        # get trainings in date time range
        trainings = Trainings.objects.filter(client_id=client_id, start_time__gte=start_date, end_time__lte=end_date).order_by('start_time')

        # count trainings for each trainer)
        training_counts = Trainings.objects.filter(
            client_id=client_id,
            start_time__gte=start_date,
            end_time__lte=end_date
        ).values('trainer__name', 'trainer__surname').annotate(count=Count('trainer'))

        # prepare data for statistics
        labels = [f"{count['trainer__name']} {count['trainer__surname']}" for count in training_counts]
        data = [count['count'] for count in training_counts]

        return Response({'labels': labels, 'data': data})
    
    @api_view(['GET'])
    def getDetailedTrainingPlans(request):
        """
        params: request [json]
        return: detailed info about training plan[JSONResoponse]
        method extracts received data and returns detailed info about training plan"""
        # load data
        if request.method == "POST":
            v_training_plan_data = json.loads(request.body.decode("utf-8"))
        else:
            v_training_plan_data = request.GET
        
        v_training_plan_id = v_training_plan_data.get("training_plan_id")
        # extract data

        training_plans = ExercisesTrainingPlans.objects.filter(training_plan=v_training_plan_id).select_related('exercise')
        data = ExercisesTrainingPlansSerializer(training_plans, many=True).data
        return JsonResponse(data, safe=False)
    
    @api_view(['GET'])
    def getStatsDayCountForGym(request, gym_id):
        """
        params: request [json]
        return: number of visits in gym[JSONResoponse]
        method extracts received data and returns number of visits in gym"""
        start_date_str = request.query_params.get('startDate', None)
        end_date_str = request.query_params.get('endDate', None)

        start_date = parse_datetime(start_date_str) if start_date_str else None
        end_date = parse_datetime(end_date_str) if end_date_str else None


        # get trainings in date time range
        v_gym = Gyms.objects.get(gym_id=gym_id)
        trainers = Trainers.objects.filter(gym=v_gym)

        # count trainings for each trainer)
        training_counts = Trainings.objects.filter(
            trainer__in=trainers,
            start_time__gte=start_date,
            end_time__lte=end_date
        ).annotate(
                start_date_only=TruncDate('start_time')
                ).values('start_date_only').annotate(count=Count('start_date_only'))

        # prepare data for statistics
        labels = [f"{count['start_date_only']}" for count in training_counts]
        data = [count['count'] for count in training_counts]

        return Response({'labels': labels, 'data': data})


    @api_view(['GET'])
    def getStatsTrainerCountForGym(request, gym_id):
        """
        params: request [json], gym_id [int]
        return: labels, data [json]
        method gets count of trainers in given gym
        """
        start_date_str = request.query_params.get('startDate', None)
        end_date_str = request.query_params.get('endDate', None)

        start_date = parse_datetime(start_date_str) if start_date_str else None
        end_date = parse_datetime(end_date_str) if end_date_str else None


        # get trainings in date time range
        v_gym = Gyms.objects.get(gym_id=gym_id)
        trainers = Trainers.objects.filter(gym=v_gym)

        # count trainings for each trainer)
        training_counts = Trainings.objects.filter(
            trainer__in=trainers,
            start_time__gte=start_date,
            end_time__lte=end_date
        ).values('trainer__name', 'trainer__surname').annotate(count=Count('trainer'))

        # prepare data for statistics
        labels = [f"{count['trainer__name']} {count['trainer__surname']}" for count in training_counts]
        data = [count['count'] for count in training_counts]

        return Response({'labels': labels, 'data': data})
    
    @api_view(['GET'])
    def getTrainersCount(request):
        """
        params: request [json]
        return: labels, data [json]
        method gets stats about trainers in all gyms
        """
        # count trainings for each gym
        trainers_counts = Trainers.objects.all().select_related('gym').values('gym__city').annotate(count=Count('gym'))

        # prepare data for statistics
        labels = [f"{count['gym__city']}" for count in trainers_counts]
        data = [count['count'] for count in trainers_counts]

        return Response({'labels': labels, 'data': data})
    
    @api_view(['GET'])
    def getEquipmentCount(request):
        """
        params: request [json]
        return: labels, data [json]
        method gets stats about count of equipment in every gym
        """
        equipment_counts = GymsEquipmentType.objects.all().select_related('gym').values('gym__city').annotate(count=Count('gym'))

        # prepare data for statistics
        labels = [f"{count['gym__city']}" for count in equipment_counts]
        data = [count['count'] for count in equipment_counts]

        return Response({'labels': labels, 'data': data})
    
    @api_view(['GET'])
    def getTrainingsCount(request):
        """
        params: request [json]
        return: labels, data [json]
        method gets stats about count of trainings in every gym
        """
        # count trainings for each trainer)
        client_counts = []
        gyms = Gyms.objects.all()
        for gym in gyms:
           training_count_in_gym = Trainings.objects.filter(trainer__gym=gym).count()
           client_counts.append(training_count_in_gym)
        # prepare data for statistics
        labels = [f"{gym.city}" for gym in gyms]
        data = [count for count in client_counts]

        return Response({'labels': labels, 'data': data})
