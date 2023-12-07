from django.db import models

class Managers(models.Model):
    manager_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)  # Przykład - dostosuj do swoich potrzeb
    email = models.EmailField(unique=True)

    def __str__(self):
        return f"{self.name} {self.surname}"
    
    class Meta:
        db_table = 'managers'