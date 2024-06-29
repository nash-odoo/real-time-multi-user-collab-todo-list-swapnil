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


class TaskItemAssigneeCreateSerializer(DynamicFieldsModelSerializer):
    assigned_permissions = serializers.ListField(
        required=False, write_only=True, allow_empty=False
    )
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True, required=True
    )

    def validate_assigned_permissions(self, permissions: list):
        if all([perm not in PERMISSION_LIST for perm in permissions]):
            raise serializers.ValidationError("Invalid permissions.")

        return permissions

    def validate(self, attrs: dict):
        if perms := attrs.pop("assigned_permissions", []):
            perm_mapping = {
                "perm_create": False,
                "perm_read": False,
                "perm_update": False,
                "perm_delete": False,
            }

            [perm_mapping.update({f"perm_{perm}": True}) for perm in perms]

        return attrs

    class Meta:
        model = TaskItemAssignee
        fields = (
            "task_item",
            "user",
            "assigned_permissions",
            "perm_create",
            "perm_read",
            "perm_update",
            "perm_delete",
        )

    def create(self, validated_data):
        instance = super().create(validated_data)


class TaskItemCreateSerializer(DynamicFieldsModelSerializer):

    assignees = serializers.ListField(required=False)
    priority = serializers.ChoiceField(
        choices=PRIORITY_CHOICES, default=PRIORITY_CHOICES.medium
    )

    def validate_assignees(self, assignee_list: list):
        self._assignee_sz = TaskItemAssigneeCreateSerializer(
            data=assignee_list, many=True, exclude=("task_item",)
        )
        self._assignee_sz.is_valid(raise_exception=True)
        return assignee_list

    class Meta:
        model = TaskItem
        fields = ("task", "priority", "text", "is_completed", "assignees")

    def create(self, validated_data: dict):
        assignees = validated_data.pop("assignees", [])

        instance: TaskItem = super().create(validated_data)
        if assignees:
            add_assginee_to_task_item(instance, assignees)

        return instance


class TaskCreateSerializer(DynamicFieldsModelSerializer):

    task_items = serializers.ListField(
        required=False, allow_empty=False, write_only=True
    )
    created_by = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    def validate_task_items(self, items: list):
        self._task_item_sz = TaskItemCreateSerializer(
            data=items, exclude=("task",), many=True
        )
        self._task_item_sz.is_valid(raise_exception=True)
        return items

    class Meta:
        model = Task
        fields = ("name", "description", "task_items", "created_by")

    def create(self, validated_data: dict):
        task_items = validated_data.pop("task_items", [])

        instance: Task = super().create(validated_data)

        if task_items:
            add_task_item_to_task(instance, task_items)

        return instance


def add_task_item_to_task(task: Task, task_items: list):

    [item.update({"task": task.id}) for item in task_items]
    sz = TaskItemCreateSerializer(data=task_items, many=True)
    sz.is_valid()
    task_item = sz.save()


def add_assginee_to_task_item(task_item: TaskItem, assignees: list):
    [assignee.update({"task_item": task_item.id}) for assignee in assignees]

    sz = TaskItemAssigneeCreateSerializer(data=assignees, many=True)
    sz.is_valid()
    assignee = sz.save()
