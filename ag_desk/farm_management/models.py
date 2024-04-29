from django.db import models
from django.conf import settings


class Task(models.Model):
    STATUS_CHOICES = [
        ("todo", "To Do"),
        ("in_progress", "In Progress"),
        ("on_hold", "On Hold"),
        ("completed", "Completed"),
    ]
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="todo")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


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


class Employee(models.Model):
    name = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    contact_number = models.CharField(max_length=50)
    email = models.EmailField()
    start_date = models.DateField()
    shift_schedule = models.CharField(max_length=255)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    skills = models.TextField(blank=True)
    status = models.CharField(max_length=50)  # or use choices as with Task.status

    def __str__(self):
        return self.name
