from django.contrib import admin
from .models import Task, InventoryItem

# Register your models here.
admin.site.register(Task)
admin.site.register(InventoryItem)