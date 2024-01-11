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
from .views import DataBaseAPIView
from rest_framework import routers

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index),
    path('manager-name-endpoint/', DataBaseAPIView.getManagerName ),
    path('gyms-endpoint/', DataBaseAPIView.getManagerGyms ),
    path('equipment-endpoint/', DataBaseAPIView.getEquipment, name="get_equipment" ),
    path('trainer-endpoint/', DataBaseAPIView.getTrainer ),
    path('signToTrainer/', DataBaseAPIView.signToTrainer ),
    path('trainer_clients/<int:trainer_id>/', DataBaseAPIView.getTrainerClients, name='trainer_clients'),
    path('client_trainings/<int:client_id>/', DataBaseAPIView.getClientTrainings, name='client_trainings'),
    path("addGym/", DataBaseAPIView.addGym, name="addGym"),
    path("deleteGym/", DataBaseAPIView.deleteGym, name="deleteGym"),
    path("modifyGym/", DataBaseAPIView.modifyGym, name="modifyGym"),
    path("addTrainer/", DataBaseAPIView.addTrainer, name="addTrainer"),
    path("deleteTrainer/", DataBaseAPIView.deleteTrainer, name="deleteTrainer"),
    path("addEquipment/", DataBaseAPIView.addEquipment, name="addEquipment"),
    
    #path('signToTrainer/', DataBaseAPIView.as_view({'post': 'signToTrainer'}), name='sign_to_trainer')
]
