from django.db.models import Q
from rest_framework.viewsets import ModelViewSet

from common.serializer_action_classes_mixin import SerializerActionClassMixin
from tasks.models import Task
from tasks.serializers import (
    TaskCreateSerializer,
    TaskDetailSerializer,
    TaskListSerializer,
)

# Create your views here.


class TaskViewSet(SerializerActionClassMixin, ModelViewSet):

    queryset = Task.objects.prefetch_related("items", "items__assignees").all()
    serializer_class = TaskListSerializer
    serializer_action_classes = {
        "list": TaskListSerializer,
        "retrieve": TaskDetailSerializer,
        "create": TaskCreateSerializer,
    }

    def get_queryset(self):
        queryset = self.queryset.filter(
            Q(created_by=self.request.user)
            | Q(items__assignees__user=self.request.user)
        )
        return queryset
