from celery import shared_task
from django.utils import timezone
from .models import Trainings, ExercisesTrainingPlans, ExercisesTrainingPlans
from .serializers import TrainingsExercisesSerializer, ExercisesTrainingPlansSerializer
import random
from django.http import JsonResponse

@shared_task
def check_training_start():
    """
    Function calls task generate_exercise_task
    for every training which started after last check (5 minutes ago)
    """
    timezone_to_add="+01:00"
    last_check_time = (timezone.localtime(timezone.now()) - timezone.timedelta(minutes=5)).strftime('%Y-%m-%d %H:%M:%S'+timezone_to_add)
    unow = timezone.localtime(timezone.now()).strftime('%Y-%m-%d %H:%M:%S'+timezone_to_add)
    # Filter trainings by start_time from last check
    new_trainings = Trainings.objects.filter(start_time__range=(last_check_time, unow))
    for training in new_trainings:
        generate_exercise_task(training.training_id)


@shared_task
def get_exercises_for_training(training):
    """
    params: training [objects]
    returns: exercises_id [list of int]
    Gets all exercises in given training
    """
    training_plan_id = training.training_plan
    exercises_id = ExercisesTrainingPlans.objects.filter(training_plan=training_plan_id).values_list('exercise_id', flat=True)
    return list(exercises_id)

@shared_task 
def generate_exercise_task(training_id):
    """
    params: training_id [int]
    return: training_log [JsonResponse]
    Gets planned exercises data and generates semirandom data for finishing exercise and saves it to database
    """
    print(f"Running Celery task for training_id={training_id}")
    training = Trainings.objects.get(training_id=training_id)
    # get all exercises in training
    exercises_id = get_exercises_for_training(training)
    # time_delay keeps delay between doing next exercises
    time_delay = 0
    for exercise_id in exercises_id:
        exercise_training_plan= ExercisesTrainingPlans.objects.get(training_plan=training.training_plan, exercise=exercise_id)
        # get data about planned exercise
        data_plan = ExercisesTrainingPlansSerializer(exercise_training_plan).data
        # compute time based on repeats if not given in data
        time = data_plan.get('repeats') * int(random.uniform(5, 10)) if data_plan.get('time') is None else data_plan.get('time') + random.choice([-1,1]) * int(data_plan.get('time')*random.uniform(0,0.2))
        time_delay += time
        # prepare generated semirandom data to save in database
        exercise_training_log = {
            'training': training_id,
            'exercise': exercise_id,
            'start_time': (timezone.localtime(timezone.now()) - timezone.timedelta(seconds=time) + timezone.timedelta(seconds=time_delay)).strftime('%Y-%m-%d %H:%M:%S+01:00'),
            'end_time': (timezone.localtime(timezone.now()) + timezone.timedelta(seconds=time_delay)).strftime('%Y-%m-%d %H:%M:%S+01:00'),
            'repeats': data_plan.get('repeats') if data_plan.get('repeats') is None else data_plan.get('repeats') + random.choice([-1,1]) * int(data_plan.get('repeats')*random.uniform(0,0.2)),
            'time': time,
            'load': data_plan.get('load') if data_plan.get('load') is None else data_plan.get('load') + random.choice([-1,1]) * int(data_plan.get('load')*random.uniform(0,0.2)),
            'calories': int(time * random.uniform(0.12, 0.2)),             
        }
        exercise_log_serializer = TrainingsExercisesSerializer(data=exercise_training_log)
        if exercise_log_serializer.is_valid():
            # save data to database
            exercise_log_serializer.save()
            # add 5 minute delay for "changing equipment"
            time_delay += 300
            print("Saving data success")
        else:
            print("Error while saving data")
    print("Celery task completed successfully")
    return JsonResponse(exercise_training_log)