from django.contrib import admin
from .models import Task, InventoryItem, Employee

# Register your models here.
admin.site.register(Task)
admin.site.register(InventoryItem)
admin.site.register(Employee)