from django.http import JsonResponse
from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .serializers import TrainingsExercisesSerializer, ExercisesTrainingPlansSerializer
from .models import ExercisesTrainingPlans, TrainingPlans
import random


class DataBaseAPIView(APIView):
    @api_view(['GET'])
    def generateExercise(request, training_plan_id, exercise_id):
        print(request.headers)
        try:
            exercise_training_plan= ExercisesTrainingPlans.objects.get(training_plan_id=training_plan_id, exercise_id=exercise_id)
            data_plan= ExercisesTrainingPlansSerializer(exercise_training_plan).data
            print(data_plan)

            training_id = TrainingPlans.objects.get(training_plan_id=training_plan_id)
            time = data_plan.get('repeat') * int(random.uniform(5, 10)) if data_plan.get('time') is None else data_plan.get('time') + random.choice([-1,1]) * int(data_plan.get('time')*random.uniform(0,0.2))
            exercise_training_log = {
                'exercise_id': exercise_id,
                'training_id': training_id,
                'load': data_plan.get('load') if data_plan.get('load') is None else data_plan.get('load') + random.choice([-1,1]) * int(data_plan.get('load')*random.uniform(0,0.2)),
                'repeat': data_plan.get('repeat') if data_plan.get('repeat') is None else data_plan.get('repeat') + random.choice([-1,1]) * int(data_plan.get('repeat')*random.uniform(0,0.2)),
                'time': time,
                'calories': int(time * random.uniform(0.06, 0.1)), 
                'end_time': datetime.now(),
                'start_time': datetime.now() - timedelta(seconds=time),
            }
            exercise_log_serializer = TrainingsExercisesSerializer(data=exercise_training_log)
            if exercise_log_serializer.is_valid():
                exercise_log_serializer.save()
                print("Saving data success")
            else:
                print("Error while saving data")
            return JsonResponse(exercise_training_log)
        except ExercisesTrainingPlans.DoesNotExist:
            return JsonResponse({'error': 'ExerciseTrainingPlan not found with this id'})
        except TrainingPlans.DoesNotExist:
            return JsonResponse({'error': 'TrainingPlan not found with this id'})
    
