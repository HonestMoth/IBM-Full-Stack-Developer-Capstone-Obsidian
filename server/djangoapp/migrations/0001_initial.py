from django.db import migrations, models
from django.core.validators import MaxValueValidator, MinValueValidator
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True
    dependencies = []
    operations = [
        migrations.CreateModel(
            name="CarMake",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=100)),
                ("description", models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name="CarModel",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=100)),
                ("type", models.CharField(choices=[("COUPE", "Coupe"), ("EXOTIC", "Exotic/Supercar"), ("HISTORIC", "Historic"), ("HYBRID", "Hybrid/EV"), ("RV", "Recreational Vehicle"), ("SEDAN", "Sedan"), ("SUV", "SUV"), ("TRUCK", "Truck"), ("WAGON", "Wagon"), ("VAN", "Van")], default="SUV", max_length=10)),
                ("year", models.IntegerField(default=2024, validators=[MaxValueValidator(2025), MinValueValidator(1886)])),
                ("car_make", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="djangoapp.carmake")),
            ],
        ),
    ]
