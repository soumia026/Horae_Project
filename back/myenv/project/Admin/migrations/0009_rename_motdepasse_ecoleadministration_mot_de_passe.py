# Generated by Django 5.0.4 on 2024-05-15 13:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Admin', '0008_rename_mot_de_passe_ecoleadministration_motdepasse'),
    ]

    operations = [
        migrations.RenameField(
            model_name='ecoleadministration',
            old_name='MotDePasse',
            new_name='mot_de_passe',
        ),
    ]
