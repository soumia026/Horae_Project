# Generated by Django 5.0.4 on 2024-05-15 14:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Admin', '0009_rename_motdepasse_ecoleadministration_mot_de_passe'),
    ]

    operations = [
        migrations.AlterField(
            model_name='enseignant',
            name='Grade',
            field=models.CharField(choices=[('Professeur', 'Professeur'), ('MCA', 'MCA'), ('MCB', 'MCB'), ('MAA', 'MAA'), ('MAB', 'MAB')], max_length=50),
        ),
    ]
