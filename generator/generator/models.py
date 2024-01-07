from django.db import models


class Clients(models.Model):
    client_id = models.IntegerField(primary_key=True)
    name = models.TextField()
    surname = models.TextField()
    phone_number = models.TextField(unique=True)
    email = models.TextField()
    age = models.IntegerField(blank=True, null=True)
    weight = models.IntegerField(blank=True, null=True)
    height = models.IntegerField(blank=True, null=True)
    hash_pass = models.CharField(max_length=40)

    def __str__(self):
        return f"{self.name} {self.surname}"

    class Meta:
        managed = False
        db_table = 'clients'


class EquipmentType(models.Model):
    equipment_id = models.IntegerField(primary_key=True)
    category = models.TextField()
    name = models.TextField()
    
    def __str__(self):
        return f"{self.category} {self.name}"

    class Meta:
        managed = False
        db_table = 'equipment_type'


class Exercises(models.Model):
    exercise_id = models.IntegerField(primary_key=True)
    category = models.IntegerField()
    name = models.IntegerField()
    equipment = models.ForeignKey(EquipmentType, models.DO_NOTHING)

    def __str__(self):
        return f"{self.category} {self.name}"

    class Meta:
        managed = False
        db_table = 'exercises'


class ExercisesTrainingPlans(models.Model):
    exercise = models.OneToOneField(Exercises, models.DO_NOTHING, primary_key=True)  # The composite primary key (exercise_id, training_plan_id) found, that is not supported. The first column is selected.
    training_plan = models.ForeignKey('TrainingPlans', models.DO_NOTHING)
    repeats = models.IntegerField(blank=True, null=True)
    time = models.IntegerField(blank=True, null=True)
    load = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'exercises_training_plans'
        unique_together = (('exercise', 'training_plan'),)


class Gyms(models.Model):
    gym_id = models.IntegerField(primary_key=True)
    city = models.TextField()
    postal_code = models.CharField(max_length=20)
    street = models.TextField()
    street_number = models.IntegerField()
    building_number = models.IntegerField(blank=True, null=True)
    manager = models.ForeignKey('Managers', models.DO_NOTHING)
    phone_number = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.city} {self.street} {self.street_number}"

    class Meta:
        managed = False
        db_table = 'gyms'


class GymsEquipmentType(models.Model):
    gym = models.OneToOneField(Gyms, models.DO_NOTHING) 
    equipment = models.ForeignKey(EquipmentType, models.DO_NOTHING)
    available = models.IntegerField()
    used = models.IntegerField()
    serial_number = models.CharField(max_length=20, primary_key=True)

    class Meta:
        managed = False
        db_table = 'gyms_equipment_type'
        unique_together = (('gym', 'equipment'),)


class Managers(models.Model):
    manager_id = models.IntegerField(primary_key=True)
    name = models.TextField()
    surname = models.TextField()
    phone_number = models.TextField(unique=True)
    email = models.TextField()
    hash_pass = models.CharField(max_length=40)

    def __str__(self):
        return f"{self.name} {self.surname}"

    class Meta:
        managed = False
        db_table = 'managers'


class Trainers(models.Model):
    trainer_id = models.IntegerField(primary_key=True)
    name = models.TextField()
    surname = models.TextField()
    phone_number = models.TextField(unique=True)
    email = models.TextField()
    hour_salary = models.IntegerField(blank=True, null=True)
    gym = models.ForeignKey(Gyms, models.DO_NOTHING)
    hash_pass = models.CharField(max_length=40)
    info = models.TextField()

    def __str__(self):
        return f"{self.name} {self.surname}"


    class Meta:
        managed = False
        db_table = 'trainers'


class TrainingPlans(models.Model):
    training_plan_id = models.IntegerField(primary_key=True)
    category = models.IntegerField()
    name = models.IntegerField()
    time = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'training_plans'


class Trainings(models.Model):
    training_id = models.AutoField(primary_key=True)
    start_time = models.DateTimeField(blank=True, null=True)
    end_time = models.DateTimeField(blank=True, null=True)
    client = models.ForeignKey(Clients, models.DO_NOTHING)
    trainer = models.ForeignKey(Trainers, models.DO_NOTHING)
    training_plan = models.ForeignKey(TrainingPlans, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'trainings'


class TrainingsExercises(models.Model):
    training = models.OneToOneField(Trainings, models.DO_NOTHING)  # The composite primary key (training_id, exercise_id) found, that is not supported. The first column is selected.
    exercise = models.ForeignKey(Exercises, models.DO_NOTHING)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(blank=True, null=True)
    repeats = models.IntegerField(blank=True, null=True)
    time = models.IntegerField(blank=True, null=True)
    load = models.IntegerField(blank=True, null=True)
    calories = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'trainings_exercises'
        unique_together = (('training', 'exercise'),)
