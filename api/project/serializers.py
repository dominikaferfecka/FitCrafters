from rest_framework import serializers
from .models import Managers, Gyms, EquipmentType, Trainers, GymsEquipmentType

class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Managers
        fields = ('manager_id', 'name')

class GymSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gyms
        fields = ('gym_id', 'city', 'street', 'manager_id', 'phone_number')

class EquipmentSerializer(serializers.ModelSerializer):
    quantity = serializers.SerializerMethodField()
    class Meta:
        model = EquipmentType
        fields = ('equipment_id', 'category', 'name', 'quantity')
    
    def get_quantity(self, obj):
        return obj


class TrainersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trainers
        fields = ('trainer_id', 'name', 'surname', 'phone_number', 'info')

