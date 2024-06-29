from django.contrib import admin

from tasks.models import Task, TaskItem, TaskItemAssignee

# Register your models here.


class TaskItemInline(admin.StackedInline):
    model = TaskItem


class TaskItemAssigneeInline(admin.StackedInline):
    model = TaskItemAssignee


class TaskAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "version", "due_date", "created_by")
    list_filter = ("due_date",)
    inlines = [TaskItemInline]


class TaskItemAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "task",
        "text",
        "priority",
        "assignee_list",
        "is_completed",
    )
    list_filter = ("priority", "is_completed")
    inlines = [TaskItemAssigneeInline]

    def assignee_list(self, instance: TaskItem):
        return list(instance.assignees.values_list("user__username", flat=True))

    assignee_list.short_description = "Assignee List"


class TaskItemAssigneeAdmin(admin.ModelAdmin):
    list_display = (
        "task_item",
        "user",
        "perm_create",
        "perm_read",
        "perm_update",
        "perm_delete",
    )
    list_filter = ("perm_create", "perm_read", "perm_update", "perm_delete")


admin.site.register(Task, TaskAdmin)
admin.site.register(TaskItem, TaskItemAdmin)
admin.site.register(TaskItemAssignee, TaskItemAssigneeAdmin)
