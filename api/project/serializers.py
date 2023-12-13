from rest_framework import serializers
from .models import Managers

class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Managers
        fields = ['name']