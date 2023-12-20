USE FitCraftersDatabase;

-- tables
-- Table: clients
CREATE TABLE clients (
    client_id int  NOT NULL,
    name longtext  NOT NULL,
    surname longtext  NOT NULL,
    phone_number longtext  NOT NULL,
    email longtext  NOT NULL,
    age int  NULL,
    weight int  NULL,
    height int  NULL,
    hash_pass varchar(40)  NOT NULL,
    CONSTRAINT clients_pk PRIMARY KEY (client_id)
);

-- Table: equipment_type
CREATE TABLE equipment_type (
    equipment_id int  NOT NULL,
    category longtext  NOT NULL,
    name longtext  NOT NULL,
    CONSTRAINT equipment_type_pk PRIMARY KEY (equipment_id)
);

-- Table: exercises
CREATE TABLE exercises (
    exercise_id int  NOT NULL,
    category longtext  NOT NULL,
    name longtext  NOT NULL,
    equipment_id int  NOT NULL,
    CONSTRAINT exercises_pk PRIMARY KEY (exercise_id)
);

-- Table: exercises_training_plans
CREATE TABLE exercises_training_plans (
    exercise_id int  NOT NULL,
    training_plan_id int  NOT NULL,
    repeats int  NULL,
    time int  NULL,
    `load` int  NULL,
    CONSTRAINT exercises_training_plans_pk PRIMARY KEY (exercise_id,training_plan_id)
);

-- Table: gyms
CREATE TABLE gyms (
    gym_id int  NOT NULL,
    city longtext  NOT NULL,
    postal_code longtext  NOT NULL,
    street longtext  NOT NULL,
    street_number int  NOT NULL,
    building_number int  NULL,
    manager_id int  NOT NULL,
    phone_number serial  NOT NULL,
    CONSTRAINT gyms_pk PRIMARY KEY (gym_id)
);

-- Table: gyms_equipment_type
CREATE TABLE gyms_equipment_type (
    gym_id int  NOT NULL,
    equipment_id int  NOT NULL,
    available bool  NOT NULL,
    used bool  NOT NULL,
    serial_number varchar(20)  NOT NULL,
    CONSTRAINT gyms_equipment_type_pk PRIMARY KEY (serial_number)
);

-- Table: managers
CREATE TABLE managers (
    manager_id int  NOT NULL,
    name longtext  NOT NULL,
    surname longtext  NOT NULL,
    phone_number longtext  NOT NULL,
    email longtext  NOT NULL,
    hash_pass varchar(40)  NOT NULL,
    CONSTRAINT managers_pk PRIMARY KEY (manager_id)
);

-- Table: trainers
CREATE TABLE trainers (
    trainer_id int  NOT NULL,
    name longtext  NOT NULL,
    surname longtext  NOT NULL,
    phone_number longtext  NOT NULL,
    email longtext  NOT NULL,
    hour_salary int  NULL,
    gym_id int  NOT NULL,
    hash_pass varchar(40)  NOT NULL,
    info longtext  NOT NULL,
    CONSTRAINT trainers_pk PRIMARY KEY (trainer_id)
);

-- Table: training_plans
CREATE TABLE training_plans (
    training_plan_id int  NOT NULL,
    category int  NOT NULL,
    name int  NOT NULL,
    time int  NULL,
    CONSTRAINT training_plans_pk PRIMARY KEY (training_plan_id)
);

-- Table: trainings
CREATE TABLE trainings (
    training_id int  NOT NULL,
    start_time int  NULL,
    end_time int  NULL,
    client_id int  NOT NULL,
    trainer_id int  NOT NULL,
    training_plan_id int  NULL,
    CONSTRAINT trainings_pk PRIMARY KEY (training_id)
);

-- Table: trainings_exercises
CREATE TABLE trainings_exercises (
    training_id int  NOT NULL,
    exercise_id int  NOT NULL,
    start_time datetime  NOT NULL,
    end_time datetime  NULL,
    repeats int  NULL,
    time int  NULL,
    `load` int  NULL,
    calories int  NULL,
    CONSTRAINT trainings_exercises_pk PRIMARY KEY (training_id,exercise_id)
);

-- foreign keys
-- Reference: exercises_equipment_type (table: exercises)
ALTER TABLE exercises ADD CONSTRAINT exercises_equipment_type FOREIGN KEY exercises_equipment_type (equipment_id)
    REFERENCES equipment_type (equipment_id);

-- Reference: exercises_training_plans_exercises (table: exercises_training_plans)
ALTER TABLE exercises_training_plans ADD CONSTRAINT exercises_training_plans_exercises FOREIGN KEY exercises_training_plans_exercises (exercise_id)
    REFERENCES exercises (exercise_id);

-- Reference: exercises_training_plans_training_plans (table: exercises_training_plans)
ALTER TABLE exercises_training_plans ADD CONSTRAINT exercises_training_plans_training_plans FOREIGN KEY exercises_training_plans_training_plans (training_plan_id)
    REFERENCES training_plans (training_plan_id);

-- Reference: gyms_equipment_type_equipment_type (table: gyms_equipment_type)
ALTER TABLE gyms_equipment_type ADD CONSTRAINT gyms_equipment_type_equipment_type FOREIGN KEY gyms_equipment_type_equipment_type (equipment_id)
    REFERENCES equipment_type (equipment_id);

-- Reference: gyms_equipment_type_gyms (table: gyms_equipment_type)
ALTER TABLE gyms_equipment_type ADD CONSTRAINT gyms_equipment_type_gyms FOREIGN KEY gyms_equipment_type_gyms (gym_id)
    REFERENCES gyms (gym_id);

-- Reference: gyms_managers (table: gyms)
ALTER TABLE gyms ADD CONSTRAINT gyms_managers FOREIGN KEY gyms_managers (manager_id)
    REFERENCES managers (manager_id);

-- Reference: trainers_gyms (table: trainers)
ALTER TABLE trainers ADD CONSTRAINT trainers_gyms FOREIGN KEY trainers_gyms (gym_id)
    REFERENCES gyms (gym_id);

-- Reference: trainings_clients (table: trainings)
ALTER TABLE trainings ADD CONSTRAINT trainings_clients FOREIGN KEY trainings_clients (client_id)
    REFERENCES clients (client_id);

-- Reference: trainings_exercises_exercises (table: trainings_exercises)
ALTER TABLE trainings_exercises ADD CONSTRAINT trainings_exercises_exercises FOREIGN KEY trainings_exercises_exercises (exercise_id)
    REFERENCES exercises (exercise_id);

-- Reference: trainings_exercises_trainings (table: trainings_exercises)
ALTER TABLE trainings_exercises ADD CONSTRAINT trainings_exercises_trainings FOREIGN KEY trainings_exercises_trainings (training_id)
    REFERENCES trainings (training_id);

-- Reference: trainings_trainers (table: trainings)
ALTER TABLE trainings ADD CONSTRAINT trainings_trainers FOREIGN KEY trainings_trainers (trainer_id)
    REFERENCES trainers (trainer_id);

-- Reference: trainings_training_plans (table: trainings)
ALTER TABLE trainings ADD CONSTRAINT trainings_training_plans FOREIGN KEY trainings_training_plans (training_plan_id)
    REFERENCES training_plans (training_plan_id);

-- End of file.

