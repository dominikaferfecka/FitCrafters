USE FitCraftersDatabase;

-- Clients
INSERT INTO clients (client_id, name, surname, phone_number, email, age, weight, height, hash_pass)
VALUES
    (1, 'Franciszek', 'Kowalski', '123456789', 'franciszek.kowalski@fitcrafters.com', 25, 70, 180, 'sdasdadad'),
    (2, 'Natalia', 'Nowak', '987654321', 'natalia.nowak@fitcrafters.com', 30, 65, 160, 'adadadadad'),
    (3, 'Piotr', 'Wiśniewski', '555555555', 'piotr.wisniewski@fitcrafters.com', 28, 75, 175, 'adadadsd');
