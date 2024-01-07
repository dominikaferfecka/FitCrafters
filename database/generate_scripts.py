# Przygotowanie skryptu SQL na podstawie podanych danych.
# Dane są podzielone na linie i mają format:
# exercise_id, category, name, equipment_id

data = """
41\tWielofunkcyjny’\twłasna waga ciała
42\tCardio\twyciąg
43\tSiła\tmaszyna dźwigniowa
44\tWielofunkcyjny’\tz pomocą
45\t Rehabilitacyjny\tmiękka piłka lekarska
46\tSiła\tpiłka stabilizująca
47\tSiła\topaska oporowa
48\tSiła\tsztanga
49\tSiła\tsznur
50\tSiła\thantla
51\tSiła\tsztanga łamana EZ
52\tSiła\tmaszyna na prowadzeniu
53\tCardio\tergometr górny korpus
54\tCardio\tkettlebell
55\tSiła\tsztanga olimpijska
56\tCardio\tz obciążeniem
57\tCardio\tpiłka Bosu
58\tSiła\topaska oporowa
59\tSiła\twałek
60\tSiła\tmaszyna skierg
61\tSiła\tmłot
62\tCardio\tmaszyna Smitha
63\t Rehabilitacyjny\twałek
64\tSiła\trower stacjonarny
65\tCardio\topona
66\tSiła\tdrążek pułapkowy
67\tSiła\tmaszyna eliptyczna
68\tCardio\tmaszyna stepmill
"""

# Podział danych na linie i wyciągnięcie poszczególnych wartości.
lines = data.strip().split("\n")
sql_statements = []

# Formatowanie i generowanie instrukcji SQL.
for line in lines:
    parts = line.split("\t")
    exercise_id = parts[0].strip('„”')  # Usunięcie znaków „ i ”
    name = parts[2].strip('„”')  # Usunięcie znaków „ i ”
    category = parts[1].strip('„”') 
    sql = f"UPDATE equipment_type SET category = '{category}', name = '{name}' WHERE equipment_id = {exercise_id};"
    sql_statements.append(sql)

# Dołączanie wszystkich instrukcji SQL do jednego ciągu tekstowego.
sql_script = "\n".join(sql_statements)
print(sql_script)
