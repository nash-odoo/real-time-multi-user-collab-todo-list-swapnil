from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from common.admin_utils import FieldSets
from users.models import User

# Register your models here.


class UserAdmin(BaseUserAdmin):
    list_display = ("username", "email", "last_login", "is_active")
    list_filter = ("is_active", "is_staff")
    search_fields = ("username", "email")
    search_help_text = "Search via Username, Email or Phone Number"
    filter_horizontal = []

    fieldsets = FieldSets(
        none=("username", "password", "email", "first_name", "last_name"),
        permissions=("is_active", "is_staff", "is_superuser"),
        important_dates=("last_login",),
    )

    readonly_fields = ("created",)


admin.site.register(User, UserAdmin)
