USE FitCraftersDatabase;

-- Clients
INSERT INTO clients (client_id, name, surname, phone_number, email, age, weight, height, hash_pass)
VALUES
    (1, 'Franciszek', 'Kowalski', '123456789', 'franciszek.kowalski@fitcrafters.com', 25, 70, 180, 'sdasdadad'),
    (2, 'Natalia', 'Nowak', '987654321', 'natalia.nowak@fitcrafters.com', 30, 65, 160, 'adadadadad'),
    (3, 'Piotr', 'Wiśniewski', '555555555', 'piotr.wisniewski@fitcrafters.com', 28, 75, 175, 'adadadsd'),
    (4, 'Katarzyna', 'Kot', '987254322', 'katarzyna.kot@fitcrafters.com', 19, 53, 160, 'dadadada'),
    (5, 'Tomasz', 'Misiek', '673926589', 'tomasz.misiek@fitcrafters.com', 22, 80, 180, 'adadad'),
    (6, 'Kamil', 'Borsuk', '482472943', 'kamil.borsuk@fitcrafters.com', 35, 76, 178, 'dfsfsfsfsf'),
    (7, 'Anna', 'Wójcik', '151223344', 'anna.wojcik@fitcrafters.com', 27, 68, 165, 'sdfdsfwer'),
    (8, 'Michał', 'Olszewski', '555511000', 'michal.olszewski@fitcrafters.com', 32, 85, 182, 'dfgdfgsdfg'),
    (9, 'Karolina', 'Duda', '987654321', 'karolina.duda@fitcrafters.com', 29, 60, 170, 'sdgfsgdfg'),
    (10, 'Marcin', 'Lis', '123789456', 'marcin.lis@fitcrafters.com', 31, 78, 175, 'dfgdfgdsf'),
    (11, 'Agnieszka', 'Czerwińska', '444555666', 'agnieszka.czerwinska@fitcrafters.com', 26, 63, 160, 'dfgdfgds'),
    (12, 'Łukasz', 'Jankowski', '777288999', 'lukasz.jankowski@fitcrafters.com', 34, 82, 178, 'dfgsdfgsdf'),
    (13, 'Monika', 'Pawlak', '123987654', 'monika.pawlak@fitcrafters.com', 23, 56, 162, 'sdfgsdfgdsf'),
    (14, 'Krzysztof', 'Zieliński', '585444333', 'krzysztof.zielinski@fitcrafters.com', 33, 88, 185, 'sdfgsdfgsd'),
    (15, 'Ewa', 'Adamczyk', '123555789', 'ewa.adamczyk@fitcrafters.com', 24, 70, 168, 'sdfgsdfgdsf'),
    (16, 'Marta', 'Kaczmarek', '987123654', 'marta.kaczmarek@fitcrafters.com', 28, 67, 163, 'sdfgdsfgdsf'),
    (17, 'Kamil', 'Zając', '181282333', 'kamil.zajac@fitcrafters.com', 30, 75, 175, 'sdfgdsfgds'),
    (18, 'Alicja', 'Krawczyk', '444585666', 'alicja.krawczyk@fitcrafters.com', 29, 58, 167, 'sdfgdsfgdsf'),
    (19, 'Bartosz', 'Lipiński', '737888999', 'bartosz.lipinski@fitcrafters.com', 31, 80, 182, 'dfgsdfgsdf'),
    (20, 'Patrycja', 'Górska', '123989456', 'patrycja.gorska@fitcrafters.com', 27, 62, 168, 'dfgsdfgsdfg'),
    (21, 'Kacper', 'Sikora', '755111000', 'kacper.sikora@fitcrafters.com', 26, 73, 178, 'dfgsdfgsdfg'),
    (22, 'Natalia', 'Stępień', '987654321', 'natalia.stepien@fitcrafters.com', 33, 68, 160, 'sdfgsdfgsd'),
    (23, 'Adam', 'Cieślak', '723456789', 'adam.cieslak@fitcrafters.com', 29, 85, 185, 'dfgsdfgsdf'),
    (24, 'Magdalena', 'Grabowska', '487254322', 'magdalena.grabowska@fitcrafters.com', 25, 55, 162, 'dfgsdfgdsf'),
    (25, 'Szymon', 'Dąbrowski', '673926589', 'szymon.dabrowski@fitcrafters.com', 34, 79, 176, 'sdfgsdfgdsf'),
    (26, 'Weronika', 'Baran', '482472943', 'weronika.baran@fitcrafters.com', 22, 60, 165, 'dfgsdfgdsf'),
    (27, 'Marek', 'Mazurek', '141243344', 'marek.mazurek@fitcrafters.com', 30, 88, 188, 'sdfgsdfgdsf'),
    (28, 'Dominika', 'Kubiak', '555535555', 'dominika.kubiak@fitcrafters.com', 28, 66, 170, 'sdfgsdfgdsf'),
    (29, 'Paweł', 'Szymański', '923987654', 'pawel.szymanski@fitcrafters.com', 27, 72, 176, 'sdfgsdfgdsf'),
    (30, 'Agnieszka', 'Lewandowska', '987151222', 'agnieszka.lewandowska@fitcrafters.com', 29, 61, 168, 'dfgsdfgdsf'),
    (31, 'Robert', 'Kowal', '193989456', 'robert.kowal@fitcrafters.com', 32, 84, 183, 'dfgsdfgdsf'),
    (32, 'Martyna', 'Zawadzka', '494555666', 'martyna.zawadzka@fitcrafters.com', 25, 57, 165, 'dfgsdfgdsf'),
    (33, 'Krzysztof', 'Jabłoński', '797889999', 'krzysztof.jablonski@fitcrafters.com', 30, 81, 180, 'sdfgsdfgdsf'),
    (34, 'Aleksandra', 'Sobczak', '123575789', 'aleksandra.sobczak@fitcrafters.com', 26, 64, 162, 'sdfgsdfgdsf'),
    (35, 'Rafał', 'Ostrowski', '171272333', 'rafal.ostrowski@fitcrafters.com', 29, 77, 178, 'sdfgsdfgdsf'),
    (36, 'Natalia', 'Szczepańska', '575444333', 'natalia.szczepanska@fitcrafters.com', 31, 70, 175, 'sdfgsdfgdsf'),
    (37, 'Piotr', 'Wawrzyniak', '173456789', 'piotr.wawrzyniak@fitcrafters.com', 28, 83, 185, 'sdfgsdfgdsf'),
    (38, 'Klaudia', 'Sadowska', '987127654', 'klaudia.sadowska@fitcrafters.com', 27, 59, 166, 'sdfgsdfgdsf'),
    (39, 'Damian', 'Kaczor', '555111000', 'damian.kaczor@fitcrafters.com', 34, 75, 177, 'sdfgsdfgdsf'),
    (40, 'Agata', 'Rutkowska', '987654321', 'agata.rutkowska@fitcrafters.com', 29, 66, 172, 'sdfgsdfgdsf'),
    (41, 'Kamil', 'Kowalczyk', '123789456', 'kamil.kowalczyk@fitcrafters.com', 32, 82, 180, 'sdfgsdfgdsf'),
    (42, 'Natalia', 'Białek', '575444333', 'natalia.bialek@fitcrafters.com', 28, 58, 160, 'sdfgsdfgdsf'),
    (43, 'Artur', 'Rogowski', '777878999', 'artur.rogowski@fitcrafters.com', 30, 80, 183, 'sdfgsdfgdsf'),
    (44, 'Monika', 'Sikorska', '123555789', 'monika.sikorska@fitcrafters.com', 26, 63, 168, 'sdfgsdfgdsf'),
    (45, 'Maciej', 'Wrona', '111222333', 'maciej.wrona@fitcrafters.com', 31, 76, 175, 'sdfgsdfgdsf'),
    (46, 'Aleksandra', 'Lipińska', '555444333', 'aleksandra.lipinska@fitcrafters.com', 27, 62, 162, 'sdfgsdfgdsf'),
    (47, 'Mikołaj', 'Dębski', '773456789', 'mikolaj.debski@fitcrafters.com', 29, 79, 178, 'sdfgsdfgdsf'),
    (48, 'Karolina', 'Cieślik', '987123654', 'karolina.cieslik@fitcrafters.com', 28, 65, 167, 'sdfgsdfgdsf'),
    (49, 'Patryk', 'Kozłowski', '555111000', 'patryk.kozlowski@fitcrafters.com', 33, 88, 185, 'sdfgsdfgdsf'),
    (50, 'Karol', 'Szymański', '771222333', 'karol.szymanski@fitcrafters.com', 28, 79, 177, 'sdfgsdfgsdf'),
    (51, 'Wiktoria', 'Walczak', '116223344', 'wiktoria.walczak@fitcrafters.com', 27, 64, 166, 'sdfdsfwer'),
    (52, 'Daniel', 'Stępień', '5565111000', 'daniel.stepien@fitcrafters.com', 32, 87, 183, 'dfgdfgsdfg'),
    (53, 'Monika', 'Duda', '987654321', 'monika.duda@fitcrafters.com', 29, 59, 169, 'sdgfsgdfg'),
    (54, 'Kamil', 'Lis', '123789456', 'kamil.lis@fitcrafters.com', 31, 76, 174, 'dfgdfgdsf'),
    (55, 'Agnieszka', 'Czajka', '464555666', 'agnieszka.czajka@fitcrafters.com', 26, 62, 161, 'dfgdfgds'),
    (56, 'Bartosz', 'Jankowski', '677888999', 'bartosz.jankowski@fitcrafters.com', 34, 81, 179, 'dfgsdfgsdf'),
    (57, 'Paulina', 'Pawlak', '123987654', 'paulina.pawlak@fitcrafters.com', 23, 55, 163, 'sdfgsdfgdsf'),
    (58, 'Grzegorz', 'Zieliński', '555444333', 'grzegorz.zielinski@fitcrafters.com', 33, 89, 186, 'sdfgsdfgsd'),
    (59, 'Anna', 'Adamczyk', '123556789', 'anna.adamczyk@fitcrafters.com', 24, 71, 169, 'sdfgsdfgdsf'),
    (60, 'Łukasz', 'Kaczmarek', '987123654', 'lukasz.kaczmarek@fitcrafters.com', 28, 68, 164, 'sdfgsdfgsdf'),
    (61, 'Magdalena', 'Zając', '161222333', 'magdalena.zajac@fitcrafters.com', 30, 74, 176, 'sdfgsdfgsd'),
    (62, 'Adam', 'Krawczyk', '464555666', 'adam.krawczyk@fitcrafters.com', 29, 56, 160, 'sdfgsdfgds'),
    (63, 'Karolina', 'Lipińska', '727888999', 'karolina.lipinska@fitcrafters.com', 31, 79, 182, 'dfgsdfgsdf'),
    (64, 'Marek', 'Grabowski', '123456789', 'marek.grabowski@fitcrafters.com', 23, 54, 161, 'dfgsdfgsdf'),
    (65, 'Monika', 'Rogowska', '987254322', 'monika.rogowska@fitcrafters.com', 25, 61, 165, 'dfgsdfgdsf'),
    (66, 'Piotr', 'Dąbrowski', '673926589', 'piotr.dabrowski@fitcrafters.com', 34, 78, 177, 'sdfgsdfg'),
    (67, 'Martyna', 'Baran', '482472943', 'martyna.baran@fitcrafters.com', 22, 61, 164, 'dfsfsfsfsf'),
    (68, 'Krzysztof', 'Mazurek', '911223344', 'krzysztof.mazurek@fitcrafters.com', 30, 87, 189, 'sdfgsdfgdsf'),
    (69, 'Natalia', 'Kubiak', '555555555', 'natalia.kubiak@fitcrafters.com', 28, 67, 172, 'sdfgsdfgdsf'),
    (70, 'Paweł', 'Szymański', '923987654', 'pawel.szymanski@fitcrafters.com', 27, 72, 178, 'sdfgsdfgdsf'),
    (71, 'Klaudia', 'Lewandowska', '987111222', 'klaudia.lewandowska@fitcrafters.com', 29, 61, 168, 'dfgsdfgdsf'),
    (72, 'Robert', 'Kowal', '923789456', 'robert.kowal@fitcrafters.com', 32, 84, 183, 'dfgsdfgdsf'),
    (73, 'Martyna', 'Zawadzka', '944555666', 'martyna.zawadzka@fitcrafters.com', 25, 57, 165, 'dfgsdfgdsf'),
    (74, 'Krzysztof', 'Jabłoński', '977888999', 'krzysztof.jablonski@fitcrafters.com', 30, 81, 180, 'sdfgsdfgdsf'),
    (75, 'Aleksandra', 'Sobczak', '123555789', 'aleksandra.sobczak@fitcrafters.com', 26, 64, 162, 'sdfgsdfgdsf'),
    (76, 'Rafał', 'Ostrowski', '111222333', 'rafal.ostrowski@fitcrafters.com', 29, 77, 178, 'sdfgsdfgdsf'),
    (77, 'Natalia', 'Szczepańska', '555444333', 'natalia.szczepanska@fitcrafters.com', 31, 70, 175, 'sdfgsdfgdsf'),
    (78, 'Piotr', 'Wawrzyniak', '123456789', 'piotr.wawrzyniak@fitcrafters.com', 28, 83, 185, 'sdfgsdfgdsf'),
    (79, 'Klaudia', 'Sadowska', '987123654', 'klaudia.sadowska@fitcrafters.com', 27, 59, 166, 'sdfgsdfgdsf'),
    (80, 'Damian', 'Kaczor', '555111000', 'damian.kaczor@fitcrafters.com', 34, 75, 177, 'sdfgsdfgdsf'),
    (81, 'Agata', 'Rutkowska', '987654321', 'agata.rutkowska@fitcrafters.com', 29, 66, 172, 'sdfgsdfgdsf'),
    (82, 'Kamil', 'Kowalczyk', '123789456', 'kamil.kowalczyk@fitcrafters.com', 32, 82, 180, 'sdfgsdfgdsf'),
    (83, 'Natalia', 'Białek', '955444333', 'natalia.bialek@fitcrafters.com', 28, 58, 160, 'sdfgsdfgdsf'),
    (84, 'Artur', 'Rogowski', '797888999', 'artur.rogowski@fitcrafters.com', 30, 80, 183, 'sdfgsdfgdsf'),
    (85, 'Monika', 'Sikorska', '123555789', 'monika.sikorska@fitcrafters.com', 26, 63, 168, 'sdfgsdfgdsf'),
    (86, 'Maciej', 'Wrona', '181222333', 'maciej.wrona@fitcrafters.com', 31, 76, 175, 'sdfgsdfgdsf'),
    (87, 'Aleksandra', 'Lipińska', '555444333', 'aleksandra.lipinska@fitcrafters.com', 27, 62, 162, 'sdfgsdfgdsf'),
    (88, 'Mikołaj', 'Dębski', '183456789', 'mikolaj.debski@fitcrafters.com', 29, 79, 178, 'sdfgsdfgdsf'),
    (89, 'Karolina', 'Cieślik', '987123654', 'karolina.cieslik@fitcrafters.com', 28, 65, 167, 'sdfgsdfgdsf'),
    (90, 'Patryk', 'Kozłowski', '555111000', 'patryk.kozlowski@fitcrafters.com', 33, 88, 185, 'sdfgsdfgdsf'),
    (91, 'Marta', 'Nowak', '987654321', 'marta.nowak@fitcrafters.com', 27, 68, 165, 'sdfdsfwer'),
    (92, 'Kacper', 'Jabłoński', '585111000', 'kacper.jablonski@fitcrafters.com', 32, 85, 182, 'dfgdfgsdfg'),
    (93, 'Dominika', 'Górska', '987654321', 'dominika.gorska@fitcrafters.com', 29, 60, 170, 'sdgfsgdfg'),
    (94, 'Marcin', 'Lis', '123789456', 'marcin.lis@fitcrafters.com', 31, 78, 175, 'dfgdfgdsf'),
    (95, 'Agnieszka', 'Czerwińska', '444555666', 'agnieszka.czerwinska@fitcrafters.com', 26, 63, 160, 'dfgdfgds'),
    (96, 'Łukasz', 'Jankowski', '677888999', 'lukasz.jankowski@fitcrafters.com', 34, 82, 178, 'dfgsdfgsdf'),
    (97, 'Monika', 'Pawlak', '123987654', 'monika.pawlak@fitcrafters.com', 23, 56, 162, 'sdfgsdfgdsf'),
    (98, 'Krzysztof', 'Zieliński', '555444333', 'krzysztof.zielinski@fitcrafters.com', 33, 88, 185, 'sdfgsdfgsd'),
    (99, 'Ewa', 'Adamczyk', '123555789', 'ewa.adamczyk@fitcrafters.com', 24, 70, 168, 'sdfgsdfgdsf'),
    (100, 'Marek', 'Kaczmarek', '987123654', 'marek.kaczmarek@fitcrafters.com', 28, 67, 163, 'sdfgsdfgsdf');


