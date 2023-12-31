# Generated by Django 4.2.5 on 2023-09-11 02:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Consutlas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('lastName', models.CharField(max_length=200)),
                ('dni', models.IntegerField(max_length=9999999999)),
                ('email', models.EmailField(max_length=254)),
                ('gender', models.CharField(choices=[('Hombre', 'Hombre'), ('Mujer', 'Mujer')])),
                ('aproved', models.BooleanField(default=False)),
                ('description', models.CharField(max_length=3000)),
            ],
        ),
    ]
