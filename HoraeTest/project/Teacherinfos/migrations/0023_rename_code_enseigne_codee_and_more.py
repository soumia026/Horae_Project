# Generated by Django 5.0.3 on 2024-03-27 17:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Teacherinfos', '0022_seance_noms_alter_groupe_specialite_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='enseigne',
            old_name='Code',
            new_name='Codee',
        ),
        migrations.RenameField(
            model_name='enseigne',
            old_name='Matricule',
            new_name='Matric',
        ),
    ]
