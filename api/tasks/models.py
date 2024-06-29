from __future__ import annotations
from typing import TYPE_CHECKING

from django.db import models
from django.db.models.functions import Now

from common.constants import MEDIUM, PRIORITY_CHOICES
from common.helpers import no_past_date
from core.models import BaseModel
from users.models import User

if TYPE_CHECKING:
    from django.db.models import Manager

# Create your models here.


class Task(BaseModel):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    due_date = models.DateTimeField(
        validators=[no_past_date], blank=True, null=True
    )
    version = models.PositiveBigIntegerField(default=1)

    created_by = models.ForeignKey(
        to=User, on_delete=models.CASCADE, related_name="tasks_created"
    )
    last_modified_by = models.ForeignKey(
        to=User,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )

    items: Manager["TaskItem"]

    class Meta:
        verbose_name = "Task"
        verbose_name_plural = "Tasks"

    def __str__(self) -> str:
        return f"{self.name}"

    @property
    def is_complete(self) -> bool:
        return not self.items.filter(is_completed=False).exists()


class TaskItem(BaseModel):
    task = models.ForeignKey(
        to=Task, on_delete=models.CASCADE, related_name="items"
    )
    priority = models.CharField(
        max_length=10, choices=PRIORITY_CHOICES, default=MEDIUM
    )
    text = models.TextField()
    is_completed = models.BooleanField(default=False)

    assignees: Manager["TaskItemAssignee"]

    class Meta:
        verbose_name = "Task Item"
        verbose_name_plural = "Task Items"

    def __str__(self) -> str:
        return f"{self.task.name} - {self.text[:15]}"


class TaskItemAssignee(BaseModel):
    task_item = models.ForeignKey(
        to=TaskItem, on_delete=models.CASCADE, related_name="assignees"
    )
    user = models.ForeignKey(
        to=User, on_delete=models.CASCADE, related_name="tasks_items"
    )

    # permissions
    perm_create = models.BooleanField(
        verbose_name="Has Create Permission ?", default=False
    )
    perm_read = models.BooleanField(
        verbose_name="Has Read Permission ?", default=True
    )
    perm_update = models.BooleanField(
        verbose_name="Has Update Permission ?", default=False
    )
    perm_delete = models.BooleanField(
        verbose_name="Has Delete Permission ?", default=False
    )

    class Meta:
        verbose_name = "Task Item Assignee"
        verbose_name_plural = "Task Item Assignees"

    def __str__(self) -> str:
        return f"{self.task_item} - {self.user}"


# class TaskHistory(BaseModel):

#     task = models.ForeignKey(
#         to=Task, on_delete=models.CASCADE, related_name="history"
#     )
#     modified_by = models.ForeignKey(
#         to=User,
#         on_delete=models.SET_NULL,
#         related_name="task_history",
#         null=True,
#     )
#     description = models.TextField(blank=True, null=True)
#     version = models.PositiveBigIntegerField()

#     class Meta:
#         verbose_name = "Task History"
#         verbose_name_plural = "Task Histories"
