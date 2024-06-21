# Generated by Django 5.0.2 on 2024-05-12 14:45

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('certgen', '0003_alter_certificate_certificant_name_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='BulkCertificates',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('heading', models.CharField(max_length=100)),
                ('certificate_about', models.TextField(max_length=150)),
                ('certificant_name', models.FileField(upload_to='usernamefiles/')),
                ('issue_date', models.DateField(default='2024-01-01')),
                ('company_name', models.CharField(max_length=100)),
                ('certificate_provider_name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('number_of_certificates', models.PositiveIntegerField()),
            ],
        ),
    ]