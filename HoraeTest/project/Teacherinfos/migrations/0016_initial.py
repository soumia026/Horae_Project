# Generated by Django 5.0.3 on 2024-03-26 17:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Teacherinfos', '0015_delete_enseignant'),
    ]

    operations = [
        migrations.CreateModel(
            name='Enseignant',
            fields=[
                ('Matricule', models.CharField(blank=True, max_length=20, primary_key=True, serialize=False)),
                ('Nom', models.CharField(blank=True, max_length=20)),
                ('Prénom', models.CharField(blank=True, max_length=50)),
                ('DateNaissance', models.DateField(blank=True, null=True)),
                ('Adresse', models.CharField(blank=True, max_length=100)),
                ('Email', models.CharField(blank=True, max_length=30)),
                ('NumeroTelephone', models.CharField(blank=True, max_length=20)),
                ('Fonction', models.CharField(choices=[('f1', 'function1'), ('f2', 'function2'), ('f3', 'function3')], max_length=20)),
                ('Grade', models.CharField(blank=True, max_length=50)),
                ('Etablissement', models.CharField(blank=True, max_length=100)),
                ('MotDePasse', models.CharField(blank=True, max_length=20)),
            ],
            options={
                'db_table': 'Enseignant',
            },
        ),
    ]
