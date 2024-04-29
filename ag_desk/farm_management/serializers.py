from rest_framework import serializers
from .models import Task, Subtask


class SubtaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subtask
        fields = ["id", "description", "completed"]


class TaskSerializer(serializers.ModelSerializer):
    subtasks = SubtaskSerializer(many=True, required=False)

    class Meta:
        model = Task
        fields = '__all__'

    def create(self, validated_data):
        subtasks_data = validated_data.pop("subtasks", [])
        task = Task.objects.create(**validated_data)
        for subtask_data in subtasks_data:
            Subtask.objects.create(task=task, **subtask_data)
        return task

    def update(self, instance, validated_data):
        subtasks_data = validated_data.pop("subtasks", [])
        instance.title = validated_data.get("title", instance.title)
        instance.status = validated_data.get("status", instance.status)
        instance.image = validated_data.get("image", instance.image)
        instance.save()

        for subtask_data in subtasks_data:
            subtask_id = subtask_data.get("id", None)
            if subtask_id:
                subtask = Subtask.objects.get(id=subtask_id, task=instance)
                subtask.description = subtask_data.get(
                    "description", subtask.description
                )
                subtask.completed = subtask_data.get("completed", subtask.completed)
                subtask.save()
            else:
                Subtask.objects.create(task=instance, **subtask_data)
        return instance
