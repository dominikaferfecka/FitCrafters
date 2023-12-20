sudo mysql < drop_tables.sql
sudo mysql < init_database.sql
sudo mysql < populate_database.sql
sudo mysql < populate_equipment.sql
sudo mysql < populate_clients.sql

sudo mysql -e "ALTER TABLE FitCraftersDatabase.trainings_exercises DROP FOREIGN KEY trainings_exercises_trainings; ALTER TABLE FitCraftersDatabase.trainings MODIFY COLUMN training_id INT AUTO_INCREMENT; ALTER TABLE FitCraftersDatabase.trainings_exercises ADD CONSTRAINT trainings_exercises_trainings FOREIGN KEY (training_id) REFERENCES FitCraftersDatabase.trainings(training_id);"