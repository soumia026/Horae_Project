# Generated by Django 5.0.4 on 2024-04-28 22:42

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Admin', '0011_remove_seance_idabs'),
    ]

    operations = [
        migrations.AlterField(
            model_name='specialite',
            name='idSection',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='Admin.section'),
        ),
    ]
