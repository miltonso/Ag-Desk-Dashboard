from django.db import models
from django.conf import settings
from django.contrib.auth.models import User



class Task(models.Model):
    STATUS_CHOICES = [
        (
            "todo",
            "To Do",
        ),
        ("inProgress", "In Progress"),
        ("onHold", "On Hold"),
        ("completed", "Completed"),
    ]

    SEVERITY_CHOICES = [
        ("high", "High"),
        ("medium", "Medium"),
        ("low", "Low"),
    ]
    title = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="todo")
    severity = models.CharField(max_length=6, choices=SEVERITY_CHOICES, default="low")
    image = models.ImageField(upload_to="task_images/", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Subtask(models.Model):
    task = models.ForeignKey(Task, related_name="subtasks", on_delete=models.CASCADE)
    description = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.description


class InventoryItem(models.Model):
    TYPE_CHOICES = [
        ("seeds", "Seeds"),
        ("fertilizers", "Fertilizers"),
        ("feed", "Feed"),
        ("tools", "Tools"),
        ("machinery", "Machinery"),
        ("vehicles", "Vehicles"),
    ]

    STATUS_CHOICES = [
        ("operational", "Operational"),
        ("needs_repair", "Needs Repair"),
        ("service_due", "Service Due"),
    ]
    name = models.CharField(max_length=255)
    item_type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    quantity = models.PositiveIntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    last_service_date = models.DateField(null=True, blank=True)
    service_details = models.TextField(blank=True)
    next_service_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name



class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_owner = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username
