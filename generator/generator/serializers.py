from rest_framework import serializers
from .models import ExercisesTrainingPlans, TrainingPlans, Exercises, TrainingsExercises, Trainings

class ExercisesTrainingPlansSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExercisesTrainingPlans
        fields = ('exercise_id', 'training_plan_id', 'repeats', 'time', 'load')

class TrainingPlansSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingPlans
        fields = ('training_plan_id', 'category', 'name', 'time')

class ExercisesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercises
        fields = ('exercise_id', 'category', 'name', 'equipment_id')

class TrainingsExercisesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingsExercises
        fields = ('training_id', 'exercise_id', 'start_time', 'end_time', 'repeats', 'time', 'load', 'calories')

class TrainingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trainings
        fields = ('training_id', 'start_time', 'end_time', 'client_id', 'trainer_id', 'training_plan_id')