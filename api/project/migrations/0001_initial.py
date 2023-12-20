# Generated by Django 5.0 on 2023-12-20 00:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Clients',
            fields=[
                ('client_id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.TextField()),
                ('surname', models.TextField()),
                ('phone_number', models.TextField(unique=True)),
                ('email', models.TextField()),
                ('age', models.IntegerField(blank=True, null=True)),
                ('weight', models.IntegerField(blank=True, null=True)),
                ('height', models.IntegerField(blank=True, null=True)),
                ('hash_pass', models.CharField(max_length=40)),
            ],
            options={
                'db_table': 'clients',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='EquipmentType',
            fields=[
                ('equipment_id', models.AutoField(primary_key=True, serialize=False)),
                ('category', models.TextField()),
                ('name', models.TextField()),
            ],
            options={
                'db_table': 'equipment_type',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Exercises',
            fields=[
                ('exercise_id', models.AutoField(primary_key=True, serialize=False)),
                ('category', models.TextField()),
                ('name', models.TextField()),
            ],
            options={
                'db_table': 'exercises',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Gyms',
            fields=[
                ('gym_id', models.IntegerField(primary_key=True, serialize=False)),
                ('city', models.TextField()),
                ('postal_code', models.CharField(max_length=20)),
                ('street', models.TextField()),
                ('street_number', models.IntegerField()),
                ('building_number', models.IntegerField(blank=True, null=True)),
                ('phone_number', models.CharField(max_length=20)),
            ],
            options={
                'db_table': 'gyms',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='GymsEquipmentType',
            fields=[
                ('available', models.IntegerField()),
                ('used', models.IntegerField()),
                ('serial_number', models.CharField(max_length=20, primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'gyms_equipment_type',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Managers',
            fields=[
                ('manager_id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.TextField()),
                ('surname', models.TextField()),
                ('phone_number', models.TextField(unique=True)),
                ('email', models.TextField()),
                ('hash_pass', models.CharField(max_length=40)),
            ],
            options={
                'db_table': 'managers',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Trainers',
            fields=[
                ('trainer_id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.TextField()),
                ('surname', models.TextField()),
                ('phone_number', models.TextField(unique=True)),
                ('email', models.TextField()),
                ('hour_salary', models.IntegerField(blank=True, null=True)),
                ('hash_pass', models.CharField(max_length=40)),
                ('info', models.TextField()),
            ],
            options={
                'db_table': 'trainers',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TrainingPlans',
            fields=[
                ('training_plan_id', models.IntegerField(primary_key=True, serialize=False)),
                ('category', models.IntegerField()),
                ('name', models.IntegerField()),
                ('time', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'training_plans',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Trainings',
            fields=[
                ('training_id', models.IntegerField(primary_key=True, serialize=False)),
                ('start_time', models.IntegerField(blank=True, null=True)),
                ('end_time', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'trainings',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='ExercisesTrainingPlans',
            fields=[
                ('exercise', models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='project.exercises')),
                ('repeats', models.IntegerField(blank=True, null=True)),
                ('time', models.IntegerField(blank=True, null=True)),
                ('load', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'exercises_training_plans',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TrainingsExercises',
            fields=[
                ('training', models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='project.trainings')),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField(blank=True, null=True)),
                ('repeats', models.IntegerField(blank=True, null=True)),
                ('time', models.IntegerField(blank=True, null=True)),
                ('load', models.IntegerField(blank=True, null=True)),
                ('calories', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'trainings_exercises',
                'managed': False,
            },
        ),
    ]
