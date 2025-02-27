# Generated by Django 5.0.6 on 2024-06-29 12:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("tasks", "0004_remove_task_due_date_cannot_be_past_date_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="taskitem",
            name="priority",
            field=models.CharField(
                choices=[("high", "High"), ("medium", "Medium"), ("low", "Low")],
                default="medium",
                max_length=10,
            ),
        ),
    ]
