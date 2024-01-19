from django.test import TestCase
from django.urls import reverse
from datetime import datetime
from .serializers import ManagerSerializer
from .models import Gyms, Managers, EquipmentType, GymsEquipmentType, Trainers, Trainings, Gyms, Clients, TrainingPlans, TrainingsExercises, Exercises
import json
from django.contrib.auth.hashers import make_password, check_password
from rest_framework import status
from django.utils import timezone
import pytz
tz = pytz.timezone('Europe/Warsaw')

class BasicTest(TestCase):
    def test_basic(self):
        self.assertTrue(True)


class ClientSignupTestCase(TestCase):
    def setup(self):
        self.client_existing = Clients.objects.create(
            client_id=1,
            name="Anna", 
            surname="Kowalska", 
            phone_number="987654321", 
            email="anna.kowalska@fitcrafters.com", 
            hash_pass="haslo",
            age=25, 
            weight=70, 
            height=180
        )

    def test_signup_successful(self):
        data = {
            "name": "Jan",
            "surname": "Kowalski",
            "phone_number": "123456789",
            "email": "jan.kowalski@gmail.com",
            "age": 25,
            "weight": 70,
            "height": 180,
            "hash_pass": "pass123",
        }

        response = self.client.post(reverse("signup"), json.dumps(data), content_type="application/json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("token", response.data)
        self.assertIn("client", response.data)

    def test_signup_invalid_data(self):
        invalid_data = {
            "name": "Jan",
            "phone_number": "123456789",
            "email": "jan.kowalski@gmail.com",
            "age": 25,
            "weight": 70,
            "height": 180,
            "hash_pass": "pass123",
        }

        response = self.client.post(reverse("signup"), json.dumps(invalid_data), content_type="application/json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_signup_exception(self):
        # prepare data with duplicate of phone_number which is in database
        data = {
            "name": "Jan",
            "surname": "Kowalski",
            "phone_number": "987654321",
            "email": "jan.kowalski@gmail.com",
            "age": 25,
            "weight": 70,
            "height": 180,
            "hash_pass": "pass123",
        }

        with self.assertRaises(Exception):
            self.client.post(reverse("signup"), json.dumps(data), content_type="application/json")

class LoginViewTests(TestCase):
    def setUp(self):
        # create a test user for each role
        self.client_user = Clients.objects.create(
            client_id=1,
            name="Anna", 
            surname="Kowalska", 
            phone_number="987654321", 
            email="anna.kowalska@fitcrafters.com", 
            hash_pass=make_password("haslo"),
            age=25, 
            weight=70, 
            height=180
        )

        self.manager_user = Managers.objects.create(
            manager_id = 1,
            name="name1",
            surname="surname2",
            phone_number="123456789",
            email="tomasz.jemiolka@fitcrafters.com",
            hash_pass=make_password("password"),
        )

        self.gym = Gyms.objects.create(
            gym_id = 1,
            city = "Warsaw",
            postal_code = "00-987",
            street = "Matejki",
            street_number = 133,
            building_number = 89,
            manager = self.manager_user,
            phone_number = "987654321",
        )

        self.trainer_user = Trainers.objects.create(
            trainer_id=1, 
            name="Andrzej", 
            surname="Nowak", 
            phone_number = "987654321", 
            email = "andrzej.nowak@gmail.com",
            hash_pass = make_password("password"),
            gym = self.gym)

    def test_login_client_success(self):
        data = {'email': 'anna.kowalska@fitcrafters.com', 'hash_pass': 'haslo', 'user': 'klient'}
        response = self.client.post('/login/', json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token_key', response.data)
        self.assertIn('token_client_id', response.data)
        self.assertIn('user', response.data)
        self.assertIn('role', response.data)
        self.assertEqual(response.data['role'], 'klient')

    def test_login_manager_success(self):
        data = {'email': "tomasz.jemiolka@fitcrafters.com", 'hash_pass': 'password', 'user': 'menadżer'}
        response = self.client.post('/login/', json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token_key', response.data)
        self.assertIn('token_manager_id', response.data)
        self.assertIn('user', response.data)
        self.assertIn('role', response.data)
        self.assertEqual(response.data['role'], 'menadżer')

    def test_login_trainer_success(self):
        data = {'email': "andrzej.nowak@gmail.com", 'hash_pass': 'password', 'user': 'trener'}
        response = self.client.post('/login/', json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token_key', response.data)
        self.assertIn('token_trainer_id', response.data)
        self.assertIn('user', response.data)
        self.assertIn('role', response.data)
        self.assertEqual(response.data['role'], 'trener')

    def test_login_invalid_credentials(self):
        data = {'email': 'anna.kowalska@fitcrafters.com', 'hash_pass': 'wrong_password', 'user': 'klient'}
        response = self.client.post('/login/', json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('detail', response.data)
        self.assertEqual(response.data['detail'], 'Invalid credentials.')

    def test_login_user_not_found(self):
        data = {'email': 'nonexistent@example.com', 'hash_pass': 'password123', 'user': 'klient'}
        response = self.client.post('/login/', json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn('detail', response.data)
        self.assertEqual(response.data['detail'], 'User not found.')

    def test_login_trainer_user_not_found(self):
        data = {'email': 'nonexistent@example.com', 'hash_pass': 'password123', 'user': 'trener'}
        response = self.client.post('/login/', json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn('detail', response.data)
        self.assertEqual(response.data['detail'], 'User not found.')

    def test_login_manager_user_not_found(self):
        data = {'email': 'nonexistent@example.com', 'hash_pass': 'password123', 'user': 'menadżer'}
        response = self.client.post('/login/', json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn('detail', response.data)
        self.assertEqual(response.data['detail'], 'User not found.')


class GetManagerNameViewTest(TestCase):
    def setUp(self):
        self.manager = Managers.objects.create(
            manager_id = 1,
            name="name1",
            surname="surname2",
            phone_number="123456789",
            email="tomasz.jemiolka@fitcrafters.com",
            hash_pass=make_password("password"),
        )

    def test_get_manager_name(self):
        # Wykonujemy zapytanie GET na naszym widoku
        response = self.client.get(reverse('get_manager_name'))

        # Sprawdzamy, czy status odpowiedzi jest 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Sprawdzamy, czy dane w odpowiedzi są poprawne
        expected_data = ManagerSerializer(self.manager).data
        self.assertEqual(response, expected_data)


# test getequipment and gettrainer
class getEquipmentTestCase(TestCase):
    def setUp(self):
        self.manager = Managers.objects.create(
            manager_id = 1,
            name="name1",
            surname="surname2",
            phone_number=123456789,
            email="tomasz.jemiolka@fitcrafters.com",
            hash_pass="password",
        )

        self.gym = Gyms.objects.create(
            gym_id = 1,
            city = "Warsaw",
            postal_code = 00-987,
            street = "Matejki",
            street_number = 133,
            building_number = 89,
            manager = self.manager,
            phone_number = 987654321,
        )

        self.equipment = EquipmentType.objects.create(
            equipment_id=17, 
            category='Cardio', 
            name='Orbitrek'    
        )
        self.equipment_gym = GymsEquipmentType.objects.create(
            gym=self.gym, 
            equipment=self.equipment, 
            available=1, 
            used=0, 
            serial_number='SN1058304'
        )


    def test_get_equipment(self):
        data = {
            "gym": 1
        }
        response = self.client.post(
            reverse("get_equipment"),
            json.dumps(data),
            content_type="application/json",
        )

        expected_response = [
            {
                "equipment_id": 17, 
                "category": 'Cardio', 
                "name": 'Orbitrek' ,
                "quantity": 1,
            },
        ]

        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding="utf8"), json.dumps(expected_response)
        )

class AddGymAsManagerTest(TestCase):
    # set up needed data - create menager who will add gyms
    def setUp(self):
        self.manager = Managers.objects.create(
            manager_id = 1,
            name = "Jan",
            surname = "Kowalski",
            phone_number = "123456789",
            email = "jan.kowalski@gmail.com",
            hash_pass = "hash_haslo",
        )
        
    def test_add_gym(self):
        # set up correct data for gym
        data = {
                "gymCity": "Warszawa",
                "gymPostalCode": "00-000",
                "gymStreet": "Złota",
                "gymStreetNumber": 12,
                "gymBuildingNumber": 3,
                "gymPhone": "123456789",
            }
        # process adding gym
        response = self.client.post(
            reverse("addGym"), 
            json.dumps(data),
            content_type="application/json",)
        # assert that adding was successfull
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Gyms.objects.count(), 1)
        self.assertJSONEqual(
            str(response.content, encoding="utf8"), {"status": "success"}
        )

    def test_add_gym_failure(self):
        # set up wrong data - missing phone number
        data = {
            "gymCity": "Test City",
            "gymPostalCode": "00-000",
            "gymStreet": "Test Street",
            "gymStreetNumber": 123,
            "gymBuildingNumber": 3,
        }

        # process adding gym
        response = self.client.post(reverse('addGym'), json.dumps(data), content_type='application/json')

        # assert adding gym wasn't successfull
        self.assertEqual(response.status_code, 500)

class ModifyGymViewTest(TestCase):
    def setUp(self):
        # set up data
        self.manager = Managers.objects.create(
            manager_id = 1,
            name = "Jan",
            surname = "Kowalski",
            phone_number = "123456789",
            email = "jan.kowalski@gmail.com",
            hash_pass = "hash_haslo",
        )

        self.gym = Gyms.objects.create(
            gym_id=1,
            city="Kraków",
            postal_code="12-345",
            street="Sezamkowa",
            street_number="1",
            building_number="1",
            phone_number="123456789",
            manager_id=1,
        )

    def test_modify_gym_view(self):
        modify_data = {
            "gymId": 1,
            "gymPhone": "987654321",
            "gymCity": "Warszawa",
            "gymPostalCode": "54-321",
            "gymStreet": "Złota",
            "gymStreetNumber": 2,
            "gymBuildingNumber": 4,
        }
        # process modify operation
        response = self.client.post(reverse("modifyGym"), json.dumps(modify_data), content_type="application/json")

        # assert operation was successful
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "success")

        # assert gym was modified
        updated_gym = Gyms.objects.get(gym_id=1)
        self.assertEqual(updated_gym.phone_number, "987654321")
        self.assertEqual(updated_gym.city, "Warszawa")
        self.assertEqual(updated_gym.postal_code, "54-321")
        self.assertEqual(updated_gym.street, "Złota")
        self.assertEqual(updated_gym.street_number, 2)
        self.assertEqual(updated_gym.building_number, 4)

    def test_modify_gym_view_failure(self):
        # set up wrong data
        modify_data = {
            "gymId": 99, # wrong ID
            "gymPhone": "987654321",
            "gymCity": "Warszawa",
            "gymPostalCode": "54-321",
            "gymStreet": "Złota",
            "gymStreetNumber": "2",
            "gymBuildingNumber": "4",
        }

        # process modify operation
        response = self.client.post(reverse("modifyGym"), json.dumps(modify_data), content_type="application/json")

        # assert operation ended with error
        self.assertEqual(response.status_code, 501)
        self.assertEqual(response.json()["status"], "gymDeleted")

class DeleteGymViewTest(TestCase):

    def setUp(self):
        # set up data
        self.manager = Managers.objects.create(
            manager_id = 1,
            name = "Jan",
            surname = "Kowalski",
            phone_number = "123456789",
            email = "jan.kowalski@gmail.com",
            hash_pass = "hash_haslo",
        )

        self.gym = Gyms.objects.create(
            gym_id=1,
            city="Kraków",
            postal_code="12-345",
            street="Sezamkowa",
            street_number="1",
            building_number="1",
            phone_number="123456789",
            manager_id=1,
        )

    def test_delete_gym_successfully(self):
        # proccess operation
        response = self.client.post('/deleteGym/', json.dumps({"gymId": 1}), content_type='application/json')
        # check if operation was successful
        self.assertEqual(response.status_code, 200)
        # assert correct messagge was returned
        self.assertEqual(response.json(), {"status": "success"})
        # check that gym was deleted
        self.assertFalse(Gyms.objects.filter(gym_id=1).exists())

    def test_delete_nonexistent_gym(self):
        # process operation with nonexistant gym
        response = self.client.post('/deleteGym/', json.dumps({"gymId": 999}), content_type='application/json')
        # assert that it failed with correct status
        self.assertEqual(response.status_code, 501)
        self.assertEqual(response.json(), {"status": "gymDeleted"})

class AddTrainerViewTest(TestCase):
    def setUp(self):
        # set up needed data - create gym and manager

        self.manager = Managers.objects.create(
            manager_id = 1,
            name = "Jan",
            surname = "Kowalski",
            phone_number = "123456789",
            email = "jan.kowalski@gmail.com",
            hash_pass = "hash_haslo",
        )
        
        self.gym = Gyms.objects.create(
            gym_id=1,
            city='Test City',
            postal_code='00-000',
            street='Test Street',
            street_number='123',
            building_number=1,
            manager_id=1,
            phone_number='123456789'
        )

    def test_add_trainer_success(self):
        # set up correct data to create trainer
        data = {
            "gymSelected": 1,
            "trainerName": "John",
            "trainerSurname": "Doe",
            "trainerPhone": "987654321",
            "trainerSalary": 50.00,
            "trainerEmail": "john.doe@example.com",
            "trainerPass": "password123"
        }

        # process adding trainer to db
        response = self.client.post(reverse("addTrainer"), json.dumps(data), content_type='application/json')

        # assert that adding trainer was successful
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Trainers.objects.count(), 1)
        self.assertEqual(json.loads(response.content)['status'], 'success')

    def test_add_trainer_failure(self):
        # set up wrong data for trainer - missing gym id
        data = {
            "trainerName": "John",
            "trainerSurname": "Doe",
            "trainerPhone": "987654321",
            "trainerSalary": 50.00,
            "trainerEmail": "john.doe@example.com",
            "trainerPass": "password123"
        }

        # process adding new trainer
        response = self.client.post(reverse("addTrainer"), json.dumps(data), content_type='application/json')

        # assert that adding trainer failed
        self.assertEqual(response.status_code, 500)
        self.assertEqual(Trainers.objects.count(), 0)

class ModifyTrainerTestCase(TestCase):
    def setUp(self):
        # set up data to use in tests
        self.manager = Managers.objects.create(
            manager_id = 1,
            name = "Jan",
            surname = "Kowalski",
            phone_number = "123456789",
            email = "jan.kowalski@gmail.com",
            hash_pass = "hash_haslo",
        )
        
        self.gym = Gyms.objects.create(
            gym_id=1,
            city='Test City',
            postal_code='00-000',
            street='Test Street',
            street_number='123',
            building_number=1,
            manager_id=1,
            phone_number='123456789'
        )

        self.trainer = Trainers.objects.create(
            trainer_id=1, 
            name="Andrzej", 
            surname="Nowak", 
            phone_number = "987654321", 
            email = "andrzej.nowak@gmail.com",
            gym = self.gym)
        
    def test_modify_trainer_success(self):
        # set up modified data
        modified_data = {
            "gymSelected": self.gym.gym_id,
            "trainerId": self.trainer.trainer_id,
            "trainerName": "Marcin",
            "trainerSurname": "Fiołek",
            "trainerPhone": self.trainer.phone_number,
            "trainerSalary": 50,
            "trainerEmail": self.trainer.email,
            "trainerPass": self.trainer.hash_pass,
            "trainerInfo": self.trainer.info,
        }

        # Wywołaj funkcję
        response = self.client.post(reverse("modifyTrainer"), json.dumps(modified_data), content_type='application/json')
        # Sprawdź, czy otrzymano poprawną odpowiedź JSON
        self.assertEqual(response.status_code, 200)

        # Odśwież obiekt trenera i sprawdź, czy dane zostały zmodyfikowane
        self.trainer.refresh_from_db()
        self.assertEqual(self.trainer.name, "Marcin")
        self.assertEqual(self.trainer.surname, "Fiołek")
        self.assertEqual(self.trainer.phone_number, "987654321")
        self.assertEqual(self.trainer.hour_salary, 50)
        self.assertEqual(self.trainer.email, "andrzej.nowak@gmail.com")
        self.assertEqual(self.trainer.info, "")

    def test_modify_trainer_trainer_not_found(self):
        # Przygotuj dane do żądania, używając nieistniejącego ID trenera
        modified_data = {
            "gymSelected": self.gym.gym_id,
            "trainerId": 999,
            "trainerName": "Marcin",
            "trainerSurname": "Fiołek",
            "trainerPhone": self.trainer.phone_number,
            "trainerSalary": 50,
            "trainerEmail": self.trainer.email,
            "trainerPass": self.trainer.hash_pass,
            "trainerInfo": self.trainer.info,
        }

        # Wywołaj funkcję
        response = self.client.post(reverse("modifyTrainer"), json.dumps(modified_data), content_type='application/json')

        # Sprawdź, czy otrzymano odpowiednią odpowiedź JSON
        self.assertEqual(response.status_code, 501)

    def test_modify_trainer_exception(self):
        # Przygotuj dane do żądania, powodując wyjątek podczas próby modyfikacji trenera
        modified_data = {
            "gymSelected": self.gym.gym_id,
            "trainerId": self.trainer.trainer_id,
            "trainerName": None,
            "trainerSurname": "Fiołek",
            "trainerPhone": self.trainer.phone_number,
            "trainerSalary": 50,
            "trainerEmail": self.trainer.email,
            "trainerPass": self.trainer.hash_pass,
            "trainerInfo": self.trainer.info,
        }

        # Wywołaj funkcję, spowoduj wyjątek przez manipulację danymi w obiekcie trenera
        self.trainer.save()

        # Wywołaj funkcję
        response = self.client.post(reverse("modifyTrainer"), json.dumps(modified_data), content_type='application/json')

        # Sprawdź, czy otrzymano odpowiednią odpowiedź JSON
        self.assertEqual(response.status_code, 500)
        self.assertIn("message", response.json())

class DeleteTrainerViewTest(TestCase):
    def setUp(self):
        self.manager = Managers.objects.create(
            manager_id = 1,
            name = "Jan",
            surname = "Kowalski",
            phone_number = "123456789",
            email = "jan.kowalski@gmail.com",
            hash_pass = "hash_haslo",
        )
        
        self.gym = Gyms.objects.create(
            gym_id=1,
            city='Test City',
            postal_code='00-000',
            street='Test Street',
            street_number='123',
            building_number=1,
            manager_id=1,
            phone_number='123456789'
        )

        self.trainer = Trainers.objects.create(
            trainer_id=1, 
            name="Andrzej", 
            surname="Nowak", 
            phone_number = "987654321", 
            gym = self.gym)

    def test_delete_trainer(self):
        # add training and exercises connected to trainer
        Clients.objects.create(client_id=1, name="Anna", surname="Kowalska", phone_number="123456789", email="anna.kowalska@fitcrafters.com", age=25, weight=70, height=180)
        training = Trainings.objects.create(trainer_id=1, client_id=1)
        # TrainingsExercises.objects.create(training=training)

        response = self.client.post(reverse("deleteTrainer"), json.dumps({"trainerId": 1}), content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "success"})

        # Check if trainer was deleted
        with self.assertRaises(Trainers.DoesNotExist):
            Trainers.objects.get(trainer_id=1)

        # Check if training was deleted
        with self.assertRaises(Trainings.DoesNotExist):
            Trainings.objects.get(pk=training.pk)

        # Check if exercise in training was deleted
        self.assertEqual(TrainingsExercises.objects.count(), 0)

    def test_delete_nonexistent_trainer(self):
        # process deleting non existant trainer
        response = self.client.post(reverse("deleteTrainer"), json.dumps({"trainerId": 2}), content_type='application/json')

        # assert operation failed
        self.assertEqual(response.status_code, 501)
        self.assertEqual(response.json(), {"status": "trainerDeleted"})

class AddEquipmentViewTest(TestCase):
    def setUp(self):
        # Create a test gym for the GymsEquipmentType
        self.manager = Managers.objects.create(
            manager_id = 1,
            name = "Jan",
            surname = "Kowalski",
            phone_number = "123456789",
            email = "jan.kowalski@gmail.com",
            hash_pass = "hash_haslo",
        )

        self.gym = Gyms.objects.create(
            gym_id=1,
            city='Test City',
            postal_code='00-000',
            street='Test Street',
            street_number='123',
            building_number=1,
            manager_id=1,
            phone_number='123456789'
        )
        self.equipment_type = EquipmentType.objects.create(
            equipment_id=17, 
            category='Cardio', 
            name='Orbitrek'   
        )

    def test_add_equipment_success(self):
        # set up correct data for GymsEquipmentType
        data = {
            "gymSelected": 1,
            "equipmentId": 17,
            "equipmentSerialNo": "123456"
        }

        # process adding equipment to gym
        response = self.client.post(reverse("addEquipment"), json.dumps(data), content_type='application/json')

        # assert that adding equipment to gym was successful
        self.assertEqual(response.status_code, 200)
        self.assertEqual(GymsEquipmentType.objects.count(), 1)
        self.assertEqual(json.loads(response.content)['status'], 'success')

    def test_add_equipment_failure(self):
        # set up wrong data
        data = {
            "equipmentId": 17,
            "equipmentSerialNo": "123456"
        }

        # process adding equipment to gym
        response = self.client.post(reverse("addEquipment"), json.dumps(data), content_type='application/json')

        # assert adding resulted in failure
        self.assertEqual(response.status_code, 500)

class ModifyEquipmentViewTest(TestCase):

    def setUp(self):
        # set up data for modifying test
        self.manager = Managers.objects.create(
            manager_id = 1,
            name = "Jan",
            surname = "Kowalski",
            phone_number = "123456789",
            email = "jan.kowalski@gmail.com",
            hash_pass = "hash_haslo",
        )

        self.gym = Gyms.objects.create(
            gym_id=1,
            city='Test City',
            postal_code='00-000',
            street='Test Street',
            street_number='123',
            building_number=1,
            manager_id=1,
            phone_number='123456789'
        )
        self.equipment_type = EquipmentType.objects.create(
            equipment_id=17, 
            category='Cardio', 
            name='Orbitrek'   
        )

        self.gyms_equipment_type = GymsEquipmentType.objects.create(
            gym = self.gym,
            equipment = self.equipment_type,
            available = 1,
            used = 0,
            serial_number = "1234",
        )

    def test_modify_equipment_successfully(self):
        # set up data to create gym_equipment_type
        data = {
            "gymSelected": 1,
            "equipmentAvailable": False,
            "equipmentSerialNumber": "1234",
        }

        # process modifying operation
        response = self.client.post('/modifyEquipment/', json.dumps(data), content_type='application/json')

        # assert operation was successful
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "success"})
        # check if gyms_equipment_type object was modified
        self.gyms_equipment_type.refresh_from_db()
        self.assertEqual(self.gyms_equipment_type.gym.gym_id, 1)
        self.assertFalse(self.gyms_equipment_type.available)

    def test_modify_nonexistent_equipment(self):
        # set up data to create gym_equipment_type
        data = {
            "equipmentSerialNumber": "999",
            "gymSelected": 1,
            "equipmentAvailable": False,
        }
        
        # process modifying operation - incorrect data
        response = self.client.post('/modifyEquipment/', json.dumps(data), content_type='application/json')

        # check if status is correct
        self.assertEqual(response.status_code, 501)
        self.assertEqual(response.json(), {"status": "equipmentDeleted"})

    def test_invalid_request(self):
        # process operation without needed data
        response = self.client.post('/modifyEquipment/', json.dumps({
            "equipmentSerialNumber": "1234",
            "gymSelected": 1,
        }), content_type='application/json')

        # assert status is correct
        self.assertEqual(response.status_code, 500)
        self.assertIn("available", response.json()["message"])

class DeleteEquipmentViewTest(TestCase):

    def setUp(self):
        # set up data for delete test
        self.manager = Managers.objects.create(
            manager_id = 1,
            name = "Jan",
            surname = "Kowalski",
            phone_number = "123456789",
            email = "jan.kowalski@gmail.com",
            hash_pass = "hash_haslo",
        )

        self.gym = Gyms.objects.create(
            gym_id=1,
            city='Test City',
            postal_code='00-000',
            street='Test Street',
            street_number='123',
            building_number=1,
            manager_id=1,
            phone_number='123456789'
        )
        self.equipment_type = EquipmentType.objects.create(
            equipment_id=17, 
            category='Cardio', 
            name='Orbitrek'   
        )

        self.gyms_equipment_type = GymsEquipmentType.objects.create(
            gym = self.gym,
            equipment = self.equipment_type,
            available = 1,
            used = 0,
            serial_number = "1234",
        )


    def test_delete_equipment_successfully(self):
        # process deleting operation
        response = self.client.post('/deleteEquipment/', json.dumps({
            "equipmentSerialNumber": "1234"
        }), content_type='application/json')

        # check if status is correct
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "success"})
        # check if equipment was deleted from database
        self.assertFalse(GymsEquipmentType.objects.filter(serial_number="1234").exists())

    def test_delete_nonexistent_equipment(self):
        # process deleting operation with incorrect equipment serial no
        response = self.client.post('/deleteEquipment/', json.dumps({
            "equipmentSerialNumber": "9999"
        }), content_type='application/json')

        # check if status is correct
        self.assertEqual(response.status_code, 501)
        self.assertEqual(response.json(), {"status": "equipmentDeleted"})

    def test_invalid_request(self):
        # process operation with incorrect data
        response = self.client.post('/deleteEquipment/', json.dumps({}), content_type='application/json')

        # check if status is correct for failure
        self.assertEqual(response.status_code, 500)
        self.assertIn("equipmentSerialNumber", response.json()["message"])

class ModifyClientTestCase(TestCase):

    def setUp(self):
        self.client_modify = Clients.objects.create(
            client_id=1,
            name="Anna", 
            surname="Kowalska", 
            phone_number="123456789", 
            email="anna.kowalska@fitcrafters.com", 
            hash_pass="haslo",
            age=25, 
            weight=70, 
            height=180
        )

    def test_modify_client_success(self):
        data = {
            "clientId": 1,
            "clientName": "Maria",
            "clientSurname": "Nowak",
            "clientPhone": "123456788",
            "clientEmail": self.client_modify.email,
            "clientPass": self.client_modify.hash_pass,
            "clientAge": 24,
            "clientWeight": 71,
            "clientHeight": 185
        }

        # process modify operation
        response = self.client.post(reverse("modifyClient"), json.dumps(data), content_type='application/json')

        # check if operation was successful
        self.assertEqual(response.status_code, 200)

        # check if data was updated in db
        updated_client = Clients.objects.get(client_id=self.client_modify.client_id)
        self.assertEqual(updated_client.name, "Maria")
        self.assertEqual(updated_client.surname, "Nowak")
        self.assertEqual(updated_client.email, "anna.kowalska@fitcrafters.com")

    def test_modify_client_nonexistent_client(self):
        # wrong data
        data = {
            "clientId": 999,  # non existing client
            "clientName": "Maria",
            "clientSurname": "Nowak",
            "clientPhone": "123456788",
            "clientEmail": self.client_modify.email,
            "clientPass": self.client_modify.hash_pass,
            "clientAge": 24,
            "clientWeight": 71,
            "clientHeight": 185
        }

        # process opearation
        response = self.client.post(reverse("modifyClient"), json.dumps(data), content_type='application/json')

        # assert that operation failed
        self.assertEqual(response.status_code, 501)  # status for non existing client

    def test_modify_client_error(self):
        # not all needed data
        data = {
            "clientId": 1,
            "clientName": "NewName",
        }

        # process operation
        response = self.client.post(reverse("modifyClient"), json.dumps(data), content_type='application/json')

        # assert that operation failed with correct status_code
        self.assertEqual(response.status_code, 500)

class TrainerClientsTestCase(TestCase):
    def setUp(self):
        manager = Managers.objects.create( manager_id = 1, name = "Jan", surname = "Kowalski", phone_number = "123456789", email = "jan.kowalski@gmail.com", hash_pass = "hash_haslo")
        gym = Gyms.objects.create(gym_id=1, city="City", postal_code="12345", street="Street", street_number=123, phone_number="987654321", manager = manager)
        Trainers.objects.create(trainer_id=1, name="Andrzej", surname="Nowak", phone_number = "987654321", gym = gym)
        Clients.objects.create(client_id=1, name="Anna", surname="Kowalska", phone_number="123456789", email="anna.kowalska@fitcrafters.com", age=25, weight=70, height=180)
        Trainings.objects.create(trainer_id=1, client_id=1)

    def test_get_trainer_clients(self):
        response = self.client.get(reverse("trainer_clients", args=[1]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        expected_data = [
            {
                'client_id': 1,
                'name': 'Anna',
                'surname': 'Kowalska',
                'phone_number': '123456789',
                'email': 'anna.kowalska@fitcrafters.com',
                'age': 25,
                'weight': 70,
                'height': 180,
                'hash_pass': '',
            }
        ]
        actual_data = response.json()

        self.assertEqual(actual_data, expected_data)

class ClientTrainingsTestCase(TestCase):
    def setUp(self):
        manager = Managers.objects.create( manager_id = 1, name = "Jan", surname = "Kowalski", phone_number = "123456789", email = "jan.kowalski@gmail.com", hash_pass = "hash_haslo")
        gym = Gyms.objects.create(gym_id=1, city="City", postal_code="12345", street="Street", street_number=123, phone_number="987654321", manager = manager)
        trainer = Trainers.objects.create(trainer_id=1, name="Andrzej", surname="Nowak", phone_number = "987654321", gym = gym)
        training_plan = TrainingPlans.objects.create(training_plan_id=1, name="Plan Cardio", category="Cardio", time=30)
        client = Clients.objects.create(client_id=1, name="Anna", surname="Kowalska", phone_number="123456789", email="anna.kowalska@fitcrafters.com", age=25, weight=70, height=180)
        training = Trainings.objects.create(training_id=1, training_plan=training_plan, trainer=trainer, client=client)

    def test_get_client_trainings(self):
        url = reverse("client_trainings", args=[1])

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        expected_data = [
            {
                'training_id': 1,
                'training_plan_name': 'Plan Cardio',
                'training_plan_category': 'Cardio',
                'training_plan_time': 30,
                'trainer_name': 'Andrzej',
                'trainer_surname': 'Nowak',
                'start_time': None, 
                'end_time': None,    
            }
        ]
        actual_data = response

        self.assertEqual(actual_data, expected_data)

class ClientTrainingsFutureTestCase(TestCase):
    def setUp(self):
        manager = Managers.objects.create( manager_id = 1, name = "Jan", surname = "Kowalski", phone_number = "123456789", email = "jan.kowalski@gmail.com", hash_pass = "hash_haslo")
        gym = Gyms.objects.create(gym_id=1, city="City", postal_code="12345", street="Street", street_number=123, phone_number="987654321", manager = manager)
        trainer = Trainers.objects.create(trainer_id=1, name="Andrzej", surname="Nowak", phone_number = "987654321", gym = gym)
        training_plan = TrainingPlans.objects.create(training_plan_id=1, name="Plan Cardio", category="Cardio", time=30)
        client = Clients.objects.create(client_id=1, name="Anna", surname="Kowalska", phone_number="123456789", email="anna.kowalska@fitcrafters.com", age=25, weight=70, height=180)
        start_datetime = datetime.strptime("2025-01-06 15:46", '%Y-%m-%d %H:%M')
        start_datetime = timezone.make_aware(start_datetime, tz)
        training = Trainings.objects.create(training_id=1, training_plan=training_plan, trainer=trainer, client=client, start_time = start_datetime) # clean write to db without tz => -1 hour

    def test_get_client_trainings_future(self):
        
        url = reverse("client_trainings_plans", args=[1])

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        expected_data = [
            {
                'training_id': 1,
                'training_plan_id': 1,
                'training_plan_name': 'Plan Cardio',
                'training_plan_category': 'Cardio',
                'training_plan_time': 30,
                'trainer_name': 'Andrzej',
                'trainer_surname': 'Nowak',
                'start_time': '2025-01-06 15:46',
                'end_time': None,
            }
        ]
        actual_data = response.json()

        print(actual_data)

        self.assertEqual(actual_data, expected_data)

class GetTrainingExercisesTestCase(TestCase):
    def setUp(self):
        manager = Managers.objects.create(
            manager_id=1,
            name="Jan",
            surname="Kowalski",
            phone_number="123456789",
            email="jan.kowalski@gmail.com",
            hash_pass="hash_haslo",
        )

        gym = Gyms.objects.create(
            gym_id=1,
            city="City",
            postal_code="12345",
            street="Street",
            street_number=123,
            phone_number="987654321",
            manager=manager,
        )

        trainer = Trainers.objects.create(
            trainer_id=1, name="Andrzej", surname="Nowak", phone_number="987654321", gym=gym
        )

        client = Clients.objects.create(
            client_id=1,
            name="Anna",
            surname="Kowalska",
            phone_number="123456789",
            email="anna.kowalska@fitcrafters.com",
            age=25,
            weight=70,
            height=180,
        )

        training_plan = TrainingPlans.objects.create(
            training_plan_id=1, name="Plan Cardio", category="Cardio", time=30
        )

        training = Trainings.objects.create(
            training_id=1, training_plan=training_plan, trainer=trainer, client=client
        )

        equipment_type = EquipmentType.objects.create(
            equipment_id=1, category="Cardio", name="Bieżnia"
        )
        GymsEquipmentType.objects.create(
            gym=gym, equipment=equipment_type, available=1, used=0, serial_number="123"
        )

        exercise = Exercises.objects.create(
            exercise_id=1, category="Cardio", name="Bieżnia", equipment= equipment_type
        )
        start_datetime = datetime.strptime("2024-01-06 16:46", '%Y-%m-%d %H:%M')
        start_datetime = timezone.make_aware(start_datetime, tz)

        TrainingsExercises.objects.create(
            training=training,
            exercise_id=1,
            start_time=start_datetime,
            end_time=None,
            repeats=10,
            time=15,
            load=20,
            calories=50,
        )

    def test_get_training_exercises_success(self):
        url = reverse("training_exercises", args=[1])

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        expected_data = [
        {
            'exercise': {'exercise_id': 1, 'category': 'Cardio', 'name': 'Bieżnia', 'equipment': 1},
            'start_time': '2024-06-01 15:46',
            'end_time': None,
            'repeats': 10,
            'time': 15,
            'load': 20,
            'calories': 50,
            'equipment_name': 'Bieżnia'
        }
        ]

        actual_data = response.json()

        print(actual_data)

        self.assertEqual(actual_data, expected_data)

    def test_get_training_exercises_failure(self):
        url = reverse("training_exercises", args=[999])

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        expected_data = {"error": "Training not found"}

        actual_data = response.json()

        self.assertEqual(actual_data, expected_data)