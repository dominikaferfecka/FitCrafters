USE FitCraftersDatabase;

-- MANAGERS
INSERT INTO managers (manager_id, name, surname, phone_number, email, hash_pass)
VALUES (1, 'Tomasz', 'Jemiolka', '735295678', 'tomasz.jemiolka@fitcrafters.com', 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0');

-- GYMS
INSERT INTO gyms (gym_id, city, postal_code, street, street_number, building_number, manager_id, phone_number)
VALUES
    (1, 'Olimpia Fitness Club', '00-001', 'Aleje Jerozolimskie', 123, NULL, 1, '123456789'),
    (2, 'Calypso Fitness Club', '00-002', 'Krakowska', 456, 789, 1, '987654321'),
    (3, 'Achilles Fitness Club', '00-003', 'Długa', 789, NULL, 1, '555666777'),
    (4, 'Venus Fitness Club', '00-004', 'Wiejska', 101, 202, 1, '7365946283'),
    (5, 'ZdroFit Fitness Club', '00-005', 'Poznańska', 21, 3, 1, '036472392');


-- TRAINERS
INSERT INTO trainers (trainer_id, name, surname, phone_number, email, hour_salary, gym_id, hash_pass, info)
VALUES
    (1, 'Adam', 'Nowak', '111222333', 'adam.nowak@fitcrafters.com', 35, 1, 'a1b2c3d4e5f6g7h84o5p6q7r8s9', 'Doświadczony trener personalny specjalizujący się w treningu siłowym. Posiada szeroką wiedzę na temat budowy masy mięśniowej i poprawy wydolności fizycznej. Jego zajęcia są zawsze pełne motywacji i dostosowane do indywidualnych celów uczestników.'),
    (2, 'Ewa', 'Kowalska', '444575666', 'ewa.kowalska@fitcrafters.com', 30, 2, 'b2c3d4e5f6g7h84o5p6q7r8s9t0u1v', 'Trener fitness z wieloletnim doświadczeniem w prowadzeniu zajęć grupowych. Specjalizuje się w treningach ogólnorozwojowych, aerobiku i pilatesie. Jej entuzjazm przyciąga ludzi o różnych poziomach zaawansowania.'),
    (3, 'Jan', 'Wiśniewski', '777888999', 'jan.wisniewski@fitcrafters.com', 30, 3, 'c3d4e5f6g7h8io5p6q7r8s9t0u1v2w4', 'Specjalista od żywienia i planowania dietetycznego. Jan jest nie tylko trenerem, ale także doradcą ds. żywienia. Pomaga klientom osiągnąć swoje cele poprzez odpowiednio dostosowaną dietę i regularny trening.'),
    (4, 'Katarzyna', 'Kowalczyk', '123456789', 'katarzyna.kowalczyk@fitcrafters.com', 35, 4, 'd4e51l2m3n46q7r80u1v2w3x4y5z6', 'Trenerka jogi z certyfikatem instruktora yoga alliance. Katarzyna kładzie duży nacisk na równowagę między umysłem a ciałem. Jej zajęcia są pełne spokoju, koncentracji i elastyczności.') ,
    (5, 'Magdalena', 'Lewandowska', '113222333', 'magdalena.lewandowska@fitcrafters.com', 28, 5, 'e5f6g7hn4o5pr8s9t0', 'Certyfikowany trener fitness z wieloletnim doświadczeniem w prowadzeniu treningów funkcjonalnych i kondycyjnych. Zawsze motywująca i pełna pozytywnej energii!'),
    (6, 'Paweł', 'Szymański', '444558666', 'pawel.szymanski@fitcrafters.com', 32, 1, 'f6g7h8i9j0k1l2m3n4o5p6q0u2w3', 'Doświadczony trener siłowy specjalizujący się w budowaniu masy mięśniowej i poprawie wydolności fizycznej. Twórca spersonalizowanych programów treningowych.'),
    (7, 'Natalia', 'Dąbrowska', '757888999', 'natalia.dabrowska@fitcrafters.com', 32, 2, 'g7h8i9j0k1l2m39t1v2w3x4', 'Trenerka zdrowego stylu życia z zamiłowaniem do jogi i medytacji. Pomocna w osiąganiu równowagi między umysłem a ciałem.'),
    (8, 'Marcin', 'Jankowski', '123535589', 'marcin.jankowski@fitcrafters.com', 38, 3, 'h8i9j0k1l2m3n4o5p6q7r8s9t0u13x4y5z6', 'Specjalista od treningu interwałowego HIIT. Entuzjasta aktywności fizycznej i zdrowego odżywiania.'),
    (9, 'Kamila', 'Nowak', '555666477', 'kamila.nowak@fitcrafters.com', 36, 4, 'i9j0k1l2m3n4o5p6q7r8s9t0u1v2c3d4', 'Trenerka tańca z wieloletnim doświadczeniem w nauczaniu różnych stylów tanecznych. Zaraża pasją do ruchu!'),
    (10, 'Artur', 'Kowalczyk', '115222333', 'artur.kowalczyk@fitcrafters.com', 29, 5, 'j0k1l2m3n4o5p6q7r8xz6a1b2c3d4e5', 'Trener personalny specjalizujący się w treningu funkcjonalnym. Motywuje do osiągania najlepszych wyników i dba o różnorodność w treningach.'),
    (11, 'Karolina', 'Kwiatkowska', '444755666', 'karolina.kwiatkowska@fitcrafters.com', 31, 1, 'k1l2m3n4o5v2w3x4z6a1b2c3d4e5f6', 'Instruktorka pilatesu i stretchingu. Pomaga w poprawie elastyczności i wzmacnianiu mięśni głębokich.'),
    (12, 'Robert', 'Wójcik', '777488799', 'robert.wojcik@fitcrafters.com', 34, 2, 'l2m3n4o5p6q7r8s9t0u1vw3x4y5z6d4e5f6g7', 'Trener biegania z pasją do maratonów. Pomaga osiągnąć cele zarówno dla początkujących, jak i zaawansowanych biegaczy.'),
    (13, 'Dominika', 'Dudek', '128450789', 'dominika.dudek@fitcrafters.com', 34, 3, 'm3n4o5p6q7r8s9td4e5f6g7h8', 'Trenerka CrossFit z miłością do intensywnego treningu. Specjalizuje się w pracy z grupami oraz dopasowywaniu treningów do różnych poziomów zaawansowania.'),
    (14, 'Łukasz', 'Sawicki', '558668777', 'lukasz.sawicki@fitcrafters.com', 27, 4, 'n4o5p6q7r8s9t01b2c5f6g7h8i9', 'Trener rehabilitacyjny z doświadczeniem w pracy z osobami z urazami mięśniowo-szkieletowymi.'),
    (15, 'Martyna', 'Zielińska', '134222333', 'martyna.zielinska@fitcrafters.com', 33, 5, 'o5p6q7r8s9t0u14e5f6g7i9j0', 'Trenerka fitness z pasją do różnorodnych form treningu. Oferuje spersonalizowane podejście do każdego uczestnika.'),
    (16, 'Adrian', 'Pawlak', '449555466', 'adrian.pawlak@fitcrafters.com', 35, 1, 'p6q7r8s9t0u1v2w3x4y5z6ae5fh80k1', 'Instruktor sztuk walki z wieloletnim doświadczeniem. Nauczy cię technik samoobrony i poprawi kondycję fizyczną.'),
    (17, 'Nina', 'Kaczorowska', '770880999', 'nina.kaczorowska@fitcrafters.com', 29, 2, 'q7r8s9t0u1v2w3x4y5c3f6g7h8i9j0k1l2', 'Trenerka pilatesu z certyfikatem Polestar Pilates. Pomaga w poprawie postawy ciała i wzmocnieniu głębokich mięśni.'),
    (18, 'Mateusz', 'Lis', '120456089', 'mateusz.lis@fitcrafters.com', 30, 3, 'r8s9t0u1v2w3x4y5z6a1b2c3d4e5f69jl2m3', 'Trener personalny z pasją do kulturystyki. Specjalizuje się w budowaniu masy mięśniowej i redukcji tkanki tłuszczowej.'),
    (19, 'Aleksandra', 'Kołodziej', '558666577', 'aleksandra.kolodziej@fitcrafters.com', 36, 4, 's9t0u1v2w3x4y5z6abd4k1l2m3n4', 'Trenerka z certyfikatem Zumba Fitness. Oferuje energiczne zajęcia taneczne dla wszystkich grup wiekowych.'),
    (20, 'Michał', 'Mazurek', '111322233', 'michal.mazurek@fitcrafters.com', 28, 5, 't0u1v2w3x4y5z6k1l2m3n4o5', 'Trener personalny z doświadczeniem w pracy z celebrytami. Pomaga osiągnąć wysokie cele treningowe i utrzymać formę przez cały rok.');

-- EQUIPMENT TYPE
INSERT INTO equipment_type (equipment_id, category, name)
VALUES
    (1, 'Siła', 'Ławka skośna'),
    (2, 'Cardio', 'Bieżnia elektryczna'),
    (3, 'Wielofunkcyjny', 'Maszyna do przysiadów'),
    (4, 'Rehabilitacyjny', 'Prostownica łydek'),
    (5, 'Akcesoria', 'Hantle różnego rodzaju'),
    (6, 'Siła', 'Wyciąg górny'),
    (7, 'Cardio', 'Rower treningowy'),
    (8, 'Wielofunkcyjny', 'Leg press'),
    (9, 'Rehabilitacyjny', 'Urządzenie do rehabilitacji kręgosłupa'),
    (10, 'Akcesoria', 'Maty do ćwiczeń'),
    (11, 'Siła', 'Maszyna do wyciskania leżąc'),
    (12, 'Cardio', 'Stepper'),
    (13, 'Wielofunkcyjny', 'Atlas hantlowy'),
    (14, 'Rehabilitacyjny', 'Sprzęt do rehabilitacji stawów'),
    (15, 'Akcesoria', 'Pasy do podciągania'),
    (16, 'Siła', 'Wyciskanie francuskie'),
    (17, 'Cardio', 'Orbitrek'),
    (18, 'Wielofunkcyjny', 'Suwnica do podciągania'),
    (19, 'Rehabilitacyjny', 'Urządzenie do ćwiczeń dla osób starszych'),
    (20, 'Akcesoria', 'Gripy do podciągania'),
    (21, 'Siła', 'Maszyna Smitha'),
    (22, 'Cardio', 'Rower spinningowy'),
    (23, 'Wielofunkcyjny', 'Maszyna do bicepsa i tricepsa'),
    (24, 'Rehabilitacyjny', 'Piłki rehabilitacyjne'),
    (25, 'Akcesoria', 'Hula hop'),
    (26, 'Siła', 'Wyciskanie hantli na ławce'),
    (27, 'Cardio', 'Trenażer eliptyczny'),
    (28, 'Wielofunkcyjny', 'Sprzęt do treningu funkcjonalnego'),
    (29, 'Rehabilitacyjny', 'Mata do równowagi'),
    (30, 'Akcesoria', 'Pilates roller'),
    (31, 'Siła', 'Wyciskanie na skosie'),
    (32, 'Cardio', 'Air bike'),
    (33, 'Wielofunkcyjny', 'Multistacja treningowa'),
    (34, 'Rehabilitacyjny', 'Ławka do ćwiczeń posturalnych'),
    (35, 'Akcesoria', 'Skakanka'),
    (36, 'Siła', 'Wyciskanie podchwytem'),
    (37, 'Cardio', 'Treadclimber'),
    (38, 'Wielofunkcyjny', 'Klatka do ćwiczeń'),
    (39, 'Rehabilitacyjny', 'Urządzenie do treningu równowagi'),
    (40, 'Akcesoria', 'Elastyczne opaski do ćwiczeń');
