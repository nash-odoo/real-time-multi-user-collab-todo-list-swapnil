from django.contrib import admin

from tasks.models import Task, TaskItem, TaskItemAssignee

# Register your models here.


class TaskAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "version", "due_date", "created_by")
    list_filter = ("due_date",)


class TaskItemAdmin(admin.ModelAdmin):
    list_display = ("id", "task", "priority", "is_completed")
    list_filter = ("priority", "is_completed")


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
