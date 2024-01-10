from django.test import TestCase, Client
from django.urls import reverse
from unittest.mock import patch
from datetime import datetime
from .models import Gyms, Managers, EquipmentType, GymsEquipmentType, Trainers, Trainings, Gyms, Clients
import json
from unittest import expectedFailure
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status

class BasicTest(TestCase):
    def test_basic(self):
        self.assertTrue(True)


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
            }
        ]
        actual_data = response.json()

        self.assertEqual(actual_data, expected_data)
