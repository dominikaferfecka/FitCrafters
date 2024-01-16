"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import index
from .views import DataBaseAPIView, AuthAPIView
from rest_framework import routers

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index),
    path('login/', AuthAPIView.login),
    path('signup/', AuthAPIView.signup),
    path('manager-name-endpoint/', DataBaseAPIView.getManagerName ),
    path('gyms-endpoint/', DataBaseAPIView.getManagerGyms ),
    path('equipment-endpoint/', DataBaseAPIView.getEquipment, name="get_equipment" ),
    path('trainer-endpoint/', DataBaseAPIView.getTrainer ),
    path('signToTrainer/', DataBaseAPIView.signToTrainer ),
    path('trainer_clients/<int:trainer_id>/', DataBaseAPIView.getTrainerClients, name='trainer_clients'),
    path('client_trainings/<int:client_id>/', DataBaseAPIView.getClientTrainings, name='client_trainings'), # history
    path("getClient/<int:client_id>/", DataBaseAPIView.getClient, name="get_client"),
    path("get_gyms_equipment/<int:gym_id>/<int:equipment_id>", DataBaseAPIView.getGymsEquipment, name="get_gyms_equipment"),
    path("addGym/", DataBaseAPIView.addGym, name="addGym"),
    path("deleteGym/", DataBaseAPIView.deleteGym, name="deleteGym"),
    path("modifyGym/", DataBaseAPIView.modifyGym, name="modifyGym"),
    path("addTrainer/", DataBaseAPIView.addTrainer, name="addTrainer"),
    path("modifyTrainer/", DataBaseAPIView.modifyTrainer, name="modifyTrainer"),
    path("deleteTrainer/", DataBaseAPIView.deleteTrainer, name="deleteTrainer"),
    path("addEquipment/", DataBaseAPIView.addEquipment, name="addEquipment"),
    path("modifyEquipment/", DataBaseAPIView.modifyEquipment, name="modifyEquipment"),
    path("deleteEquipment/", DataBaseAPIView.deleteEquipment, name="deleteEquipment"),
    path("modifyClient/", DataBaseAPIView.modifyClient, name="modifyClient"),
    path('training_exercises/<int:training_id>/', DataBaseAPIView.getTrainingExercises, name='training_exercises'),
    path('client_trainings_plans/<int:client_id>/', DataBaseAPIView.getClientTrainingsFuture, name='client_trainings_plans'),
    path('training-plans/', DataBaseAPIView.getTrainingPlans, name='training_plans'),
    path('update-client-training-plan/', DataBaseAPIView.updateTrainingPlan, name='update-client-training-plan'),
    path('training-stats-calories/<int:client_id>/', DataBaseAPIView.getClientTrainingStatsCalories, name='training-stats-calories'),
    path('training-stats-duration/<int:client_id>/', DataBaseAPIView.getClientTrainingStatsDuration, name='training-stats-duration'),
    path('training-stats-category/<int:client_id>/', DataBaseAPIView.getClientStatsPlansCategoryCount, name='training-stats-category'),
    path('training-stats-name/<int:client_id>/', DataBaseAPIView.getClientStatsPlansNameCount, name='training-stats-name'),
    path('training-stats-trainer/<int:client_id>/', DataBaseAPIView.getClientStatsTrainerCount, name='training-stats-trainer'),
    path("get-trainer_trainings/", DataBaseAPIView.getTrainerTrainings, name="getTrainerTrainings"),
    path("delete_training/", DataBaseAPIView.deleteTraining, name="deleteTraining"),
    path("get-training-plans-info/", DataBaseAPIView.getDetailedTrainingPlans, name="detailed-training-plans")
    #path('signToTrainer/', DataBaseAPIView.as_view({'post': 'signToTrainer'}), name='sign_to_trainer')
]