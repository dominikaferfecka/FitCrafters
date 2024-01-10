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
    def setUp(self):
        self.manager = Managers.objects.create(
            manager_id = 1,
            name = "Jan",
            surname = "Kowalski",
            phone_number = "123456789",
            email = "jan.kowalski@gmail.com",
            hash_pass = "hash_haslo",
        )
        
    def test_save_gym(self):
        data = {
                "gymCity": "Warszawa",
                "gymPostalCode": "00-000",
                "gymStreet": "Złota",
                "gymStreetNumber": 12,
                "gymBuildingNumber": 3,
                "gymPhone": "123456789",
            }
        response = self.client.post(
            reverse("addGym"), 
            json.dumps(data),
            content_type="application/json",)
        print(response.content) 
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding="utf8"), {"status": "success"}
        )


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
