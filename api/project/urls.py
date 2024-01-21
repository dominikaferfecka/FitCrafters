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
from .views import AuthAPIView, ManagerAPIView, ClientManagerAPIView, ClientAPIView, TrainerAPIView, ClientTrainerAPIView, ClientStatsAPIView, ManagerStatsAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', AuthAPIView.login),
    path('signup/', AuthAPIView.signup, name="signup"),
    path('manager-name-endpoint/', ManagerAPIView.getManagerName, name="get_manager_name" ),
    path('gyms-endpoint/', ManagerAPIView.getManagerGyms ),
    path('equipment-endpoint/', ManagerAPIView.getEquipment, name="get_equipment" ),
    path('trainer-endpoint/', ClientManagerAPIView.getTrainer ),
    path('signToTrainer/', ClientAPIView.signToTrainer ),
    path('trainer_clients/<int:trainer_id>/', TrainerAPIView.getTrainerClients, name='trainer_clients'),
    path('client_trainings/<int:client_id>/', ClientTrainerAPIView.getClientTrainings, name='client_trainings'), # history
    path("getClient/<str:token>/", ClientAPIView.getClient, name="get_client"),
    path("get_gyms_equipment/<int:gym_id>/<int:equipment_id>", ManagerAPIView.getGymsEquipment, name="get_gyms_equipment"),
    path("addGym/", ManagerAPIView.addGym, name="addGym"),
    path("deleteGym/", ManagerAPIView.deleteGym, name="deleteGym"),
    path("modifyGym/", ManagerAPIView.modifyGym, name="modifyGym"),
    path("addTrainer/", ManagerAPIView.addTrainer, name="addTrainer"),
    path("modifyTrainer/", ManagerAPIView.modifyTrainer, name="modifyTrainer"),
    path("deleteTrainer/", ManagerAPIView.deleteTrainer, name="deleteTrainer"),
    path("addEquipment/", ManagerAPIView.addEquipment, name="addEquipment"),
    path("modifyEquipment/", ManagerAPIView.modifyEquipment, name="modifyEquipment"),
    path("deleteEquipment/", ManagerAPIView.deleteEquipment, name="deleteEquipment"),
    path("modifyClient/", ClientAPIView.modifyClient, name="modifyClient"),
    path('training_exercises/<int:training_id>/', ClientTrainerAPIView.getTrainingExercises, name='training_exercises'),
    path('client_trainings_plans/<int:client_id>/', ClientTrainerAPIView.getClientTrainingsFuture, name='client_trainings_plans'),
    path('training-plans/', TrainerAPIView.getTrainingPlans, name='training_plans'),
    path('update-client-training-plan/', TrainerAPIView.updateTrainingPlan, name='update-client-training-plan'),
    path('training-stats-calories/<int:client_id>/', ClientStatsAPIView.getClientTrainingStatsCalories, name='training-stats-calories'),
    path('training-stats-duration/<int:client_id>/', ClientStatsAPIView.getClientTrainingStatsDuration, name='training-stats-duration'),
    path('training-stats-category/<int:client_id>/', ClientStatsAPIView.getClientStatsPlansCategoryCount, name='training-stats-category'),
    path('training-stats-name/<int:client_id>/', ClientStatsAPIView.getClientStatsPlansNameCount, name='training-stats-name'),
    path('training-stats-trainer/<int:client_id>/', ClientStatsAPIView.getClientStatsTrainerCount, name='training-stats-trainer'),
    path("get-trainer_trainings/", TrainerAPIView.getTrainerTrainings, name="getTrainerTrainings"),
    path("delete_training/", TrainerAPIView.deleteTraining, name="deleteTraining"),
    path("get-training-plans-info/", ClientTrainerAPIView.getDetailedTrainingPlans, name="detailed-training-plans"),
    path("gym-stats-days-trainings-count/<int:gym_id>/", ManagerStatsAPIView.getStatsDayCountForGym, name="getStatsDayCountForGym"),
    path("gym-stats-trainers-trainings-count/<int:gym_id>/", ManagerStatsAPIView.getStatsTrainerCountForGym, name="getStatsTrainerCountForGym"),
    path("gym-stats-trainers-count/", ManagerStatsAPIView.getTrainersCount, name="getTrainersCount"),
    path("gym-stats-equipment-count/", ManagerStatsAPIView.getEquipmentCount, name="getEquipmentCount"),
    path("gym-stats-trainings-count/", ManagerStatsAPIView.getTrainingsCount, name="getTrainingsCount"),
]