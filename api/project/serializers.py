from rest_framework import serializers
from .models import Managers, Gyms, EquipmentType, Trainers

class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Managers
        fields = ('manager_id', 'name')

class GymSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gyms
        fields = ('gym_id', 'city', 'street', 'manager_id', 'phone_number')

class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquipmentType
        fields = ('equipment_id', 'category', 'name')

class TrainersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trainers
        fields = ('trainer_id', 'name', 'surname', 'phone_number', 'info')

