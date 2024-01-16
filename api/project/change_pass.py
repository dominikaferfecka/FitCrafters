import sys
from pathlib import Path

# Get path to pwd
current_directory = Path.cwd()

# Add path to Django project
django_project_dir = current_directory.parent
sys.path.append(str(django_project_dir))
from project.models import Clients, Trainers, Managers
from django.contrib.auth.hashers import make_password

# Get all managers
# For changing other users passwords, change table
users = Managers.objects.all()

for user in users:
    # Create password Name123
    new_password = user.name + "123"
    
    # Create hashed_pass
    hashed_password = make_password(new_password)

    # update password in db
    user.hash_pass = hashed_password
    user.save()

if __name__ == "__main__":
    import django
    django.setup()