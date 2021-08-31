# Generated by Django 3.2.5 on 2021-08-31 06:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('writer', models.CharField(max_length=50)),
                ('name', models.CharField(max_length=150)),
                ('price', models.DecimalField(decimal_places=2, max_digits=7)),
                ('description', models.TextField()),
                ('category', models.CharField(blank=True, max_length=50, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='uploads/images')),
            ],
        ),
    ]