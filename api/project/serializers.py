from rest_framework import serializers
from .models import Managers, Gyms, EquipmentType, Trainers, GymsEquipmentType, Clients, Trainings, TrainingPlans, TrainingsExercises, Exercises
from django.utils import timezone

class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Managers
        fields = ('manager_id', 'name')

class GymSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gyms
        fields = ('gym_id', 'city', 'street', 'manager_id', 'phone_number', "street_number", "building_number", "postal_code")

class EquipmentSerializer(serializers.ModelSerializer):
    quantity = serializers.SerializerMethodField()
    class Meta:
        model = EquipmentType
        fields = ('equipment_id', 'category', 'name', 'quantity')
    
    def get_quantity(self, obj):
        return obj

class EquipmentAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquipmentType
        fields = ('equipment_id', 'category', 'name')

class TrainersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trainers
        fields = ('trainer_id', 'name', 'surname', 'phone_number', 'info', 'email', 'hash_pass', 'hour_salary', 'gym')

class TrainerTrainingsSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source='client.name',allow_null=True)
    client_surname = serializers.CharField(source='client.surname',allow_null=True)
    class Meta:
        model = Trainings
        fields = ('training_id', 'trainer_id', 'client_name', 'client_surname', 'training_plan_id', 'start_time', 'end_time')

class ClientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clients
        fields = ('client_id', 'name', 'surname', 'phone_number', 'email', 'age', 'weight', 'height', "hash_pass")


class ClientTrainingsSerializer(serializers.Serializer):
    training_plan_name = serializers.CharField(source='training_plan.name',allow_null=True)
    training_plan_category = serializers.CharField(source='training_plan.category',allow_null=True)
    training_plan_time = serializers.IntegerField(source='training_plan.time',allow_null=True)
    trainer_name = serializers.CharField(source='trainer.name',allow_null=True)
    trainer_surname = serializers.CharField(source='trainer.surname',allow_null=True)
    start_time = serializers.DateTimeField(allow_null=True, format="%Y-%m-%dT%H:%M:%S%z")
    end_time = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S%z", required=False, allow_null=True)
    training_id = serializers.IntegerField()

    class Meta:
        fields = ('training_id','training_plan_name', 'training_plan_category', 'training_plan_time', 'trainer_name', 'trainer_surname', 'start_time', 'end_time')


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercises
        fields = ('exercise_id', 'category', 'name', 'equipment')

class GymsEquipmentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = GymsEquipmentType
        fields = '__all__'

class TrainingsExercisesSerializer(serializers.ModelSerializer):
    exercise = ExerciseSerializer()
    start_time = serializers.DateTimeField(allow_null=True, format='%d-%m-%Y %H:%M:%S')
    end_time = serializers.DateTimeField(allow_null=True, format='%d-%m-%Y %H:%M:%S')

    class Meta:
        model = TrainingsExercises
        fields = ('exercise', 'start_time', 'end_time', 'repeats', 'time', 'load', 'calories', 'equipment_name')

    equipment_name = serializers.SerializerMethodField()

    def get_equipment_name(self, obj):
        return obj.exercise.equipment.name if obj.exercise.equipment else None
    

class TrainingPlansSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingPlans
        fields = ('training_plan_id', 'category', 'name', 'time')


# class ClientTrainingsWithTrainingPlan(serializers.ModelSerializer):
#     training_plan = TrainingPlansSerializer()

#     class Meta:
#         model = Trainings
#         fields = ('training_id', 'start_time', 'end_time', 'client', 'trainer', 'training_plan', 'training_plan_name')

    
