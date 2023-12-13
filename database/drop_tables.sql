USE FitCraftersDatabase;

-- foreign keys
ALTER TABLE exercises
    DROP FOREIGN KEY exercises_equipment_type;

ALTER TABLE exercises_training_plans
    DROP FOREIGN KEY exercises_training_plans_exercises;

ALTER TABLE exercises_training_plans
    DROP FOREIGN KEY exercises_training_plans_training_plans;

ALTER TABLE gyms_equipment_type
    DROP FOREIGN KEY gyms_equipment_type_equipment_type;

ALTER TABLE gyms_equipment_type
    DROP FOREIGN KEY gyms_equipment_type_gyms;

ALTER TABLE gyms
    DROP FOREIGN KEY gyms_managers;

ALTER TABLE trainers
    DROP FOREIGN KEY trainers_gyms;

ALTER TABLE trainings
    DROP FOREIGN KEY trainings_clients;

ALTER TABLE trainings_exercises
    DROP FOREIGN KEY trainings_exercises_exercises;

ALTER TABLE trainings_exercises
    DROP FOREIGN KEY trainings_exercises_trainings;

ALTER TABLE trainings
    DROP FOREIGN KEY trainings_trainers;

ALTER TABLE trainings
    DROP FOREIGN KEY trainings_training_plans;

-- tables
DROP TABLE clients;

DROP TABLE equipment_type;

DROP TABLE exercises;

DROP TABLE exercises_training_plans;

DROP TABLE gyms;

DROP TABLE gyms_equipment_type;

DROP TABLE managers;

DROP TABLE trainers;

DROP TABLE training_plans;

DROP TABLE trainings;

DROP TABLE trainings_exercises;

-- End of file.

