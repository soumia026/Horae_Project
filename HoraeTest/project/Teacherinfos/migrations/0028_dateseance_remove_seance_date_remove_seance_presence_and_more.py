# Generated by Django 5.0.3 on 2024-03-28 00:42

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Teacherinfos', '0027_abcence_idprof'),
    ]

    operations = [
        migrations.CreateModel(
            name='dateSeance',
            fields=[
                ('IddatteS', models.AutoField(primary_key=True, serialize=False)),
                ('date', models.DateField(default=None, null=True)),
            ],
            options={
                'db_table': 'dateSeance',
            },
        ),
        migrations.RemoveField(
            model_name='seance',
            name='Date',
        ),
        migrations.RemoveField(
            model_name='seance',
            name='Presence',
        ),
        migrations.CreateModel(
            name='Seances',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.ForeignKey(default=None, on_delete=django.db.models.deletion.DO_NOTHING, to='Teacherinfos.dateseance')),
                ('idSeance', models.ForeignKey(default=None, on_delete=django.db.models.deletion.DO_NOTHING, to='Teacherinfos.seance')),
            ],
            options={
                'db_table': 'Seances',
            },
        ),
    ]
