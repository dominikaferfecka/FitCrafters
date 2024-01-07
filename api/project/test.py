from django.test import TestCase, Client
from django.urls import reverse
from unittest.mock import patch
from datetime import datetime
from .models import Gyms, Managers, EquipmentType, GymsEquipmentType
import json
from unittest import expectedFailure
from django.core.exceptions import ObjectDoesNotExist

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
