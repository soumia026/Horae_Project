# Generated by Django 5.0.4 on 2024-04-27 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Admin', '0005_alter_abcence_dateabs_alter_abcence_heuredebut_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='abcence',
            name='DateAbs',
            field=models.DateField(blank=True, default=None),
        ),
    ]
