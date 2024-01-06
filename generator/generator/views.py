from django.http import JsonResponse
from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .serializers import TrainingsExercisesSerializer, ExercisesTrainingPlansSerializer
from .models import ExercisesTrainingPlans, Trainings
import random


class DataBaseAPIView(APIView):
    @api_view(['GET'])
    def generateExercise(request, training_plan_id, exercise_id):
        print(request.headers)
        # try:
        exercise_training_plan= ExercisesTrainingPlans.objects.get(training_plan_id=training_plan_id, exercise_id=exercise_id)
        data_plan= ExercisesTrainingPlansSerializer(exercise_training_plan).data
        print(data_plan)
        print(Trainings.objects.get(training_plan=training_plan_id).training_id)
        training_id = Trainings.objects.get(training_plan=training_plan_id).training_id
        time = data_plan.get('repeats') * int(random.uniform(5, 10)) if data_plan.get('time') is None else data_plan.get('time') + random.choice([-1,1]) * int(data_plan.get('time')*random.uniform(0,0.2))
        exercise_training_log = {
            'training': training_id,
            'exercise': exercise_id,
            'start_time': datetime.now() - timedelta(seconds=time),
            'end_time': datetime.now(),
            'repeats': data_plan.get('repeats') if data_plan.get('repeats') is None else data_plan.get('repeats') + random.choice([-1,1]) * int(data_plan.get('repeats')*random.uniform(0,0.2)),
            'time': time,
            'load': data_plan.get('load') if data_plan.get('load') is None else data_plan.get('load') + random.choice([-1,1]) * int(data_plan.get('load')*random.uniform(0,0.2)),
            'calories': int(time * random.uniform(0.06, 0.1)),             
        }
        print(exercise_training_log)
        exercise_log_serializer = TrainingsExercisesSerializer(data=exercise_training_log)
        if exercise_log_serializer.is_valid():
            exercise_log_serializer.save()
            print("Saving data success")
        else:
            print("Error while saving data")
            print(exercise_log_serializer.errors)
        return JsonResponse(exercise_training_log)
        # except ExercisesTrainingPlans.DoesNotExist:
        #     return JsonResponse({'error': 'ExerciseTrainingPlan not found with this id'})
        # except TrainingPlans.DoesNotExist:
        #     return JsonResponse({'error': 'TrainingPlan not found with this id'})
    
