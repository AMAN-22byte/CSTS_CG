# Generated by Django 5.0.2 on 2024-05-12 05:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Certificate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('heading', models.CharField(max_length=100)),
                ('certificate_about', models.TextField(default='This is a default description.', max_length=150)),
                ('certificant_name', models.CharField(default='Name of Person', max_length=100)),
                ('issue_date', models.DateField(default='2024-01-01')),
                ('company_name', models.CharField(default='Company Name', max_length=100)),
                ('certificate_provider_name', models.CharField(default='Certificate Provider Name', max_length=100)),
            ],
        ),
    ]
