from rest_framework import serializers

from common.constants import PERMISSION_LIST, PRIORITY_CHOICES
from core.serializers import DynamicFieldsModelSerializer
from tasks.models import Task, TaskItem, TaskItemAssignee
from users.models import User
from users.serializers import UserSerializer

# Create your serializers here.


class TaskItemAssigneeListSerializer(DynamicFieldsModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")
    permissions = serializers.SerializerMethodField()

    def get_permissions(self, instance: TaskItemAssignee) -> dict[str, bool]:
        response = {
            "create": instance.perm_create,
            "read": instance.perm_read,
            "update": instance.perm_update,
            "delete": instance.perm_delete,
        }
        return response

    class Meta:
        model = TaskItemAssignee
        fields = ("id", "task_item", "user", "username", "permissions")
        read_only_fields = fields


class TaskItemSerializer(DynamicFieldsModelSerializer):

    assignees = TaskItemAssigneeListSerializer(
        exclude=("task_item", "user"), many=True
    )

    class Meta:
        model = TaskItem
        fields = ("id", "task", "priority", "text", "is_completed", "assignees")
        read_only_fields = fields


class TaskListSerializer(DynamicFieldsModelSerializer):
    # collaborators = serializers.SerializerMethodField()

    # def get_collaborators(self, instance: Task):
    #     return instance.items.

    class Meta:
        model = Task
        fields = (
            "id",
            "name",
            "description",
            "due_date",
        )  # "collaborators")
        read_only_fields = fields


class TaskDetailSerializer(DynamicFieldsModelSerializer):

    items = TaskItemSerializer(many=True)
    created_by = UserSerializer(fields=("id", "username", "profile_picture"))
    last_modified_by = UserSerializer(
        fields=("id", "username", "profile_picture")
    )

    class Meta:
        model = Task
        fields = (
            "id",
            "name",
            "description",
            "items",
            "version",
            "created_by",
            "last_modified_by",
            "created",
            "modified",
        )
        read_only_fields = fields


# class TaskItemAssigneeCreateSerializer(DynamicFieldsModelSerializer):
#     assigned_permissions = serializers.ListField(
#         required=False, write_only=True
#     )
#     user = serializers.PrimaryKeyRelatedField(
#         queryset=User.objects.all(), write_only=True, required=True
#     )

#     def validate_assigned_permissions(self, permissions: list):
#         if all([perm not in PERMISSION_LIST for perm in permissions]):
#             raise serializers.ValidationError("Invalid permissions.")

#         return permissions

#     class Meta:
#         model = TaskItemAssignee
#         fields = ("user", "assigned_permissions")


# class TaskItemCreateUpdateSerializer(DynamicFieldsModelSerializer):

#     assignees = serializers.ListField(required=False)
#     priority = serializers.ChoiceField(
#         choices=PRIORITY_CHOICES, default=PRIORITY_CHOICES.medium
#     )

#     class Meta:
#         model = TaskItem
#         fields = ("priority", "text", "is_completed", "assignees")

#     def create(self, validated_data: dict):
#         if assignees_data := validated_data.pop("assignees", None):
#             assignee_sz = TaskItemAssigneeCreateSerializer(assignees_data, many=True)
#             assignee_sz.is_valid(raise_exception=True)

#         instance = super().create(validated_data)

#         add_task_item_to_task(task_item=instance, assignee=assignees_data)


# class TaskCreateUpdateSerializer(DynamicFieldsModelSerializer):

#     task_items = TaskItemCreateUpdateSerializer(required=False, many=True)

#     class Meta:
#         model = Task
#         fields = ("name", "description", "task_items")

#     def create(self, validated_data: dict):
#         instance: Task = super().create(validated_data)

#         return instance


# def add_task_item_to_task(task_item: TaskItem, assignee: list):
