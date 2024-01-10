from django.core.management.base import BaseCommand
from django.db import transaction
from project.models import EquipmentType, Exercises
import requests
import json

class Command(BaseCommand):
    help = 'Insert equipment type from external API into database.'

    def handle(self, *args, **options):
        equipment_list_url = 'https://zylalabs.com/api/392/exercise+database+api/2082/list+of+equipment'
        header = {'Authorization': 'Bearer 3049|PQqn5xhQmxFTuV7pwpAD3nHl90a0kOFZPsnvxZPd'}
        with requests.Session() as session:
            eq_response = session.get(equipment_list_url, headers=header)
            if eq_response.status_code == 200:
                equipment_list = json.loads(eq_response.text)
                with transaction.atomic():
                    id = 1
                    for i in range(len(equipment_list)):
                        equipment = equipment_list[i]
                        EquipmentType.objects.create(
                            equipment_id=i+41,
                            category='',
                            name=equipment
                        )
                        exercise_url = 'https://zylalabs.com/api/392/exercise+database+api/2083/list+by+equipment?equipment={}'.format(equipment)
                        ex_response = session.get(exercise_url, headers=header)
                        if ex_response.status_code == 200:
                            exercises_list = json.loads(ex_response.text)
                            for j in range(len(exercises_list)):
                                Exercises.objects.create(
                                exercise_id=id,
                                category=exercises_list[j]['target'],
                                name=exercises_list[j]['name'],
                                equipment_id=i+41
                                )
                                id += 1
            else:
                self.stdout.write(self.style.ERROR(f"Error: {eq_response.status_code}, {eq_response.text}"))
